import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('auth_sessions')
export class AuthSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  user_id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Index()
  @Column({ type: 'varchar', length: 255 })
  refresh_token_hash: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  device_info: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  ip_address: string | null;

  @Column({ type: 'timestamptz' })
  expires_at: Date;

  @Column({ type: 'boolean', default: false })
  is_revoked: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
