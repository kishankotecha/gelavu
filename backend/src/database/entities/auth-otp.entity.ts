import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('auth_otps')
export class AuthOtp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 255 })
  otp_hash: string;

  @Column({ type: 'int', default: 0 })
  attempt_count: number;

  @Column({ type: 'varchar', length: 20, default: 'LOGIN' })
  purpose: string;

  @Column({ type: 'timestamptz' })
  expires_at: Date;

  @Column({ type: 'boolean', default: false })
  is_used: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
