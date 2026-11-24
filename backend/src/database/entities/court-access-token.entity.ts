import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Court } from './court.entity';
import { User } from './user.entity';

@Entity('court_access_tokens')
export class CourtAccessToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  court_id: string;

  @ManyToOne(() => Court, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'court_id' })
  court: Court;

  @Column({ type: 'varchar', length: 20 })
  short_code: string; // e.g. "CRT-101"

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255 })
  token_hash: string;

  @Index()
  @Column({ type: 'uuid', nullable: true })
  assigned_user_id: string | null;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'assigned_user_id' })
  assigned_user: User | null;

  @Column({ type: 'timestamptz' })
  expires_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  revoked_at: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  last_active_at: Date | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
