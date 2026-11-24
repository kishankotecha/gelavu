import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../database/entities/user.entity';
import { PlayerProfile } from '../../database/entities/player-profile.entity';
import { HostProfile, KycStatus } from '../../database/entities/host-profile.entity';
import { City } from '../../database/entities/city.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePlayerProfileDto } from './dto/update-player-profile.dto';
import { SubmitHostKycDto } from './dto/submit-host-kyc.dto';
import { serializeUser } from './user.serializer';

/** Drops keys whose value is undefined so omitted DTO fields never overwrite stored data. */
function definedFields<T extends object>(dto: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(dto).filter(([, value]) => value !== undefined),
  ) as Partial<T>;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(PlayerProfile)
    private readonly playerProfileRepository: Repository<PlayerProfile>,
    @InjectRepository(HostProfile)
    private readonly hostProfileRepository: Repository<HostProfile>,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}

  async getMe(userId: string) {
    return serializeUser(await this.loadUser(userId));
  }

  async updateMe(userId: string, dto: UpdateUserDto) {
    await this.loadUser(userId);

    const patch = definedFields(dto) as Partial<User>;
    if (patch.city_id) {
      await this.assertActiveCity(patch.city_id);
    }
    if (typeof patch.name === 'string') {
      patch.name = patch.name.trim();
    }

    // Column-level update avoids cascading saves through the loaded relations.
    if (Object.keys(patch).length > 0) {
      await this.userRepository.update(userId, patch);
    }
    return this.getMe(userId);
  }

  async updatePlayerProfile(userId: string, dto: UpdatePlayerProfileDto) {
    const user = await this.loadUser(userId);
    if (!user.roles.includes('PLAYER')) {
      throw new ForbiddenException('Player profile is not available for this account');
    }

    const profile =
      user.player_profile ?? this.playerProfileRepository.create({ user_id: userId });
    Object.assign(profile, definedFields(dto));
    await this.playerProfileRepository.save(profile);

    return this.getMe(userId);
  }

  /**
   * Submits or resubmits host KYC. Always moves kyc_status back to PENDING for admin review.
   * Verified KYC is locked; changing those details needs an admin path.
   */
  async submitHostKyc(userId: string, dto: SubmitHostKycDto) {
    const user = await this.loadUser(userId);
    if (!user.roles.includes('HOST')) {
      throw new ForbiddenException('Switch to HOST mode before submitting host KYC');
    }

    await this.assertActiveCity(dto.city_id);

    const host =
      user.host_profile ??
      this.hostProfileRepository.create({
        user_id: userId,
        contact_phone: dto.contact_phone,
      });

    if (host.kyc_status === KycStatus.VERIFIED) {
      throw new ConflictException(
        'Host KYC is already verified. Contact support to change verified details.',
      );
    }

    Object.assign(host, {
      organization_name: dto.organization_name.trim(),
      contact_phone: dto.contact_phone,
      city_id: dto.city_id,
      pan_number: dto.pan_number,
      gstin: dto.gstin ?? null,
      kyc_status: KycStatus.PENDING,
      rejection_reason: null,
    });
    await this.hostProfileRepository.save(host);

    return this.getMe(userId);
  }

  private async loadUser(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { player_profile: true, host_profile: { city: true }, city: true },
    });
    if (!user || !user.is_active) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private async assertActiveCity(cityId: string): Promise<void> {
    const count = await this.cityRepository.count({
      where: { id: cityId, is_active: true },
    });
    if (count === 0) {
      throw new BadRequestException('City not found or inactive');
    }
  }
}
