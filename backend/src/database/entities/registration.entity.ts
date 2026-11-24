import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Tournament } from './tournament.entity';
import { TournamentCategory } from './tournament-category.entity';
import { User } from './user.entity';
import { numericTransformer } from '../transformers/numeric.transformer';

export enum PaymentMode {
  FULL = 'FULL',
  SPLIT = 'SPLIT',
}

export enum PartnerInviteStatus {
  NONE = 'NONE',
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
}

export enum RegistrationStatus {
  PENDING = 'PENDING',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  AWAITING_PARTNER = 'AWAITING_PARTNER',
  CONFIRMED = 'CONFIRMED',
  WAITLISTED = 'WAITLISTED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
  EXPIRED = 'EXPIRED',
}

@Entity('registrations')
@Index(
  'uq_active_registration_per_category',
  ['category_id', 'player_id'],
  {
    unique: true,
    where: "status NOT IN ('CANCELLED', 'REFUNDED', 'EXPIRED')",
  },
)
@Index('idx_reg_category_status_hold', [
  'category_id',
  'status',
  'slot_hold_expires_at',
])
export class Registration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  tournament_id: string;

  @ManyToOne(() => Tournament, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'tournament_id' })
  tournament: Tournament;

  @Index()
  @Column({ type: 'uuid' })
  category_id: string;

  @ManyToOne(() => TournamentCategory, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'category_id' })
  category: TournamentCategory;

  @Index()
  @Column({ type: 'uuid' })
  player_id: string;

  @ManyToOne(() => User, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'player_id' })
  player: User;

  @Index()
  @Column({ type: 'uuid', nullable: true })
  partner_id: string | null;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'partner_id' })
  partner: User | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  partner_name: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  partner_phone: string | null;

  @Index({ unique: true, where: 'invite_token IS NOT NULL' })
  @Column({ type: 'varchar', length: 100, nullable: true })
  invite_token: string | null;

  @Column({
    type: 'enum',
    enum: PaymentMode,
    default: PaymentMode.FULL,
  })
  payment_mode: PaymentMode;

  @Column({
    type: 'enum',
    enum: PartnerInviteStatus,
    default: PartnerInviteStatus.NONE,
  })
  partner_invite_status: PartnerInviteStatus;

  @Column({
    type: 'enum',
    enum: RegistrationStatus,
    default: RegistrationStatus.PENDING,
  })
  status: RegistrationStatus;

  @Column({ type: 'int', nullable: true })
  waitlist_position: number | null;

  @Column({ type: 'timestamptz', nullable: true })
  slot_hold_expires_at: Date | null;

  @Column({ type: 'boolean', default: false })
  is_host_added: boolean;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: numericTransformer,
  })
  total_amount: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
