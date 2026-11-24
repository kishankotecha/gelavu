import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { City } from './city.entity';

export enum KycStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
}

@Entity('host_profiles')
export class HostProfile {
  @PrimaryColumn('uuid')
  user_id: string;

  @OneToOne(() => User, (user) => user.host_profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', length: 150 })
  organization_name: string;

  @Column({ type: 'varchar', length: 20 })
  contact_phone: string;

  @Index()
  @Column({ type: 'uuid', nullable: true })
  city_id: string | null;

  @ManyToOne(() => City, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'city_id' })
  city: City | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  pan_number: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  gstin: string | null;

  @Column({ type: 'text', nullable: true })
  bank_account_number_encrypted: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  bank_ifsc: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  bank_beneficiary_name: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  razorpay_account_id: string | null;

  @Column({
    type: 'enum',
    enum: KycStatus,
    default: KycStatus.PENDING,
  })
  kyc_status: KycStatus;

  @Column({ type: 'jsonb', nullable: true })
  kyc_documents: Record<string, any> | null;

  @Column({ type: 'boolean', default: false })
  is_verified: boolean;

  @Index()
  @Column({ type: 'uuid', nullable: true })
  verified_by: string | null;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'verified_by' })
  verifier: User | null;

  @Column({ type: 'timestamptz', nullable: true })
  verified_at: Date | null;

  @Column({ type: 'text', nullable: true })
  rejection_reason: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
