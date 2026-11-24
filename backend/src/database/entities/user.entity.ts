import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { PlayerProfile } from './player-profile.entity';
import { HostProfile } from './host-profile.entity';
import { City } from './city.entity';

export enum ActiveMode {
  PLAY = 'PLAY',
  HOST = 'HOST',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true, where: 'phone IS NOT NULL' })
  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string | null;

  @Index({ unique: true, where: 'email IS NOT NULL' })
  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string | null;

  @Index({ unique: true, where: 'google_id IS NOT NULL' })
  @Column({ type: 'varchar', length: 255, nullable: true })
  google_id: string | null;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  avatar_url: string | null;

  @Index()
  @Column({ type: 'uuid', nullable: true })
  city_id: string | null;

  @ManyToOne(() => City, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'city_id' })
  city: City | null;

  // Safe PostgreSQL array default expression
  @Column({
    type: 'text',
    array: true,
    default: () => "ARRAY['PLAYER']::text[]",
  })
  roles: string[];

  @Column({
    type: 'enum',
    enum: ActiveMode,
    default: ActiveMode.PLAY,
  })
  active_mode: ActiveMode;

  @Column({ type: 'timestamptz', nullable: true })
  phone_verified_at: Date | null;

  @Column({ type: 'varchar', length: 10, default: 'en' })
  preferred_language: string;

  @Column({ type: 'jsonb', nullable: true })
  privacy_settings: Record<string, any> | null;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @OneToOne(() => PlayerProfile, (profile) => profile.user, { cascade: true })
  player_profile: PlayerProfile;

  @OneToOne(() => HostProfile, (profile) => profile.user, { cascade: true })
  host_profile: HostProfile;
}
