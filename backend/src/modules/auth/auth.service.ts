import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { User, ActiveMode } from '../../database/entities/user.entity';
import { PlayerProfile, PlayingLevel, DominantHand } from '../../database/entities/player-profile.entity';
import { HostProfile, KycStatus } from '../../database/entities/host-profile.entity';
import { AuthOtp } from '../../database/entities/auth-otp.entity';
import { AuthSession } from '../../database/entities/auth-session.entity';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { SwitchModeDto } from './dto/switch-mode.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(PlayerProfile)
    private readonly playerProfileRepository: Repository<PlayerProfile>,
    @InjectRepository(HostProfile)
    private readonly hostProfileRepository: Repository<HostProfile>,
    @InjectRepository(AuthOtp)
    private readonly otpRepository: Repository<AuthOtp>,
    @InjectRepository(AuthSession)
    private readonly sessionRepository: Repository<AuthSession>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Generates and dispatches a 6-digit OTP to the mobile number
   */
  async sendOtp(dto: SendOtpDto) {
    const phone = dto.phone.trim().replace(/\D/g, '');

    // Rate limiting: check attempts in last 15 minutes
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
    const recentAttempts = await this.otpRepository.count({
      where: {
        phone,
        created_at: MoreThan(fifteenMinutesAgo),
      },
    });

    if (recentAttempts >= 5) {
      throw new BadRequestException(
        'Too many OTP requests. Please wait 15 minutes before trying again.',
      );
    }

    // Generate 6-digit OTP
    const isDev = this.configService.get<string>('NODE_ENV') !== 'production';
    const otp = isDev ? '123456' : Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes validity

    const otpRecord = this.otpRepository.create({
      phone,
      otp_hash: otpHash,
      expires_at: expiresAt,
      purpose: 'LOGIN',
    });
    await this.otpRepository.save(otpRecord);

    // In local dev, log OTP for immediate developer visibility
    this.logger.log(`🔑 OTP for +91 ${phone}: [${otp}] (expires in 5 mins)`);

    return {
      success: true,
      message: `OTP sent successfully to +91 ${phone}`,
      phone,
      expiresIn: 300,
      devOtp: isDev ? otp : undefined,
    };
  }

  /**
   * Verifies OTP and returns JWT tokens + user profile (creates user if new)
   */
  async verifyOtp(dto: VerifyOtpDto, clientIp?: string, userAgent?: string) {
    const phone = dto.phone.trim().replace(/\D/g, '');
    const isDev = this.configService.get<string>('NODE_ENV') !== 'production';

    // Find latest valid OTP
    const validOtp = await this.otpRepository.findOne({
      where: {
        phone,
        is_used: false,
        expires_at: MoreThan(new Date()),
      },
      order: { created_at: 'DESC' },
    });

    let isValid = false;
    if (validOtp && validOtp.attempt_count >= 5) {
      throw new BadRequestException(
        'Too many invalid OTP attempts. Please request a new verification code.',
      );
    }

    if (isDev && dto.otp === '123456') {
      isValid = true;
    } else if (validOtp) {
      isValid = await bcrypt.compare(dto.otp, validOtp.otp_hash);
    }

    if (!isValid) {
      if (validOtp) {
        validOtp.attempt_count += 1;
        await this.otpRepository.save(validOtp);
      }
      throw new BadRequestException('Invalid or expired verification code');
    }

    if (validOtp) {
      validOtp.is_used = true;
      await this.otpRepository.save(validOtp);
    }

    // Find or create user
    let user = await this.userRepository.findOne({
      where: { phone },
      relations: { player_profile: true, host_profile: true },
    });

    let isNewUser = false;

    if (!user) {
      isNewUser = true;
      user = this.userRepository.create({
        phone,
        name: `Player ${phone.slice(-4)}`,
        roles: ['PLAYER'],
        active_mode: ActiveMode.PLAY,
        phone_verified_at: new Date(),
        is_active: true,
      });
      user = await this.userRepository.save(user);

      // Create default player profile
      const playerProfile = this.playerProfileRepository.create({
        user_id: user.id,
        playing_level: PlayingLevel.BEGINNER,
        dominant_hand: DominantHand.RIGHT,
        rating: 1200,
        reliability_score: 100.0,
      });
      await this.playerProfileRepository.save(playerProfile);
      user.player_profile = playerProfile;
    }

    // Generate JWT access & refresh tokens
    const tokens = await this.generateTokens(user);

    // Save session
    await this.createSession(user.id, tokens.refreshToken, clientIp, userAgent);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: this.sanitizeUser(user),
      isNewUser,
    };
  }

  /**
   * Switches user mode between PLAY and HOST
   */
  async switchMode(userId: string, dto: SwitchModeDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { player_profile: true, host_profile: true },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (dto.mode === ActiveMode.HOST) {
      if (!user.roles.includes('HOST')) {
        user.roles.push('HOST');
      }
      // If host profile doesn't exist, create initial stub
      if (!user.host_profile) {
        const hostProfile = this.hostProfileRepository.create({
          user_id: user.id,
          organization_name: `${user.name}'s Tournaments`,
          contact_phone: user.phone || '',
          kyc_status: KycStatus.PENDING,
          is_verified: false,
        });
        await this.hostProfileRepository.save(hostProfile);
        user.host_profile = hostProfile;
      }
    }

    user.active_mode = dto.mode;
    await this.userRepository.save(user);

    const tokens = await this.generateTokens(user);

    return {
      message: `Successfully switched to ${dto.mode} mode`,
      accessToken: tokens.accessToken,
      user: this.sanitizeUser(user),
    };
  }

  /**
   * Rotates JWT access and refresh tokens
   */
  async refreshToken(dto: RefreshTokenDto, clientIp?: string, userAgent?: string) {
    try {
      const payload = this.jwtService.verify(dto.refreshToken, {
        secret: this.configService.get<string>(
          'JWT_REFRESH_SECRET',
          'gelavu_refresh_secret_key_2026',
        ),
      });

      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
        relations: { player_profile: true, host_profile: true },
      });

      if (!user || !user.is_active) {
        throw new UnauthorizedException('User not found or inactive');
      }

      // Verify refresh token against active (non-revoked, non-expired) sessions
      const activeSessions = await this.sessionRepository.find({
        where: {
          user_id: user.id,
          is_revoked: false,
          expires_at: MoreThan(new Date()),
        },
        order: { created_at: 'DESC' },
      });

      let matchedSession: AuthSession | null = null;
      for (const session of activeSessions) {
        const isMatch = await bcrypt.compare(
          dto.refreshToken,
          session.refresh_token_hash,
        );
        if (isMatch) {
          matchedSession = session;
          break;
        }
      }

      if (!matchedSession) {
        throw new UnauthorizedException('Session has been revoked or expired');
      }

      // Rotate: revoke the used refresh session before issuing a new one
      matchedSession.is_revoked = true;
      await this.sessionRepository.save(matchedSession);

      const tokens = await this.generateTokens(user);
      await this.createSession(user.id, tokens.refreshToken, clientIp, userAgent);

      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  /**
   * Returns current user with full profiles
   */
  async getMe(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { player_profile: true, host_profile: true },
    });
    if (!user) throw new UnauthorizedException('User not found');
    return this.sanitizeUser(user);
  }

  /**
   * Revokes all active sessions for user
   */
  async logout(userId: string) {
    await this.sessionRepository.update({ user_id: userId }, { is_revoked: true });
    return { success: true, message: 'Successfully logged out' };
  }

  private async generateTokens(user: User) {
    const payload = {
      sub: user.id,
      phone: user.phone,
      roles: user.roles,
      active_mode: user.active_mode,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>(
        'JWT_SECRET',
        'gelavu_super_secret_jwt_key_2026_sports',
      ),
      expiresIn: this.configService.get<string>('JWT_EXPIRATION', '7d') as any,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>(
        'JWT_REFRESH_SECRET',
        'gelavu_refresh_secret_key_2026',
      ),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION', '30d') as any,
    });

    return { accessToken, refreshToken };
  }

  private async createSession(
    userId: string,
    refreshToken: string,
    ip?: string,
    device?: string,
  ) {
    const hash = await bcrypt.hash(refreshToken, 8);
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    const session = this.sessionRepository.create({
      user_id: userId,
      refresh_token_hash: hash,
      ip_address: ip || null,
      device_info: device ? device.slice(0, 250) : null,
      expires_at: expiresAt,
    });
    await this.sessionRepository.save(session);
  }

  private sanitizeUser(user: User) {
    const { ...safeUser } = user;
    if (safeUser.host_profile?.bank_account_number_encrypted) {
      safeUser.host_profile.bank_account_number_encrypted = '••••••••';
    }
    return safeUser;
  }
}
