import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { Sport } from './sport.entity';
import { City } from './city.entity';
import { TournamentCategory } from './tournament-category.entity';
import { numericTransformer } from '../transformers/numeric.transformer';

export enum TournamentStatus {
  DRAFT = 'DRAFT',
  UPCOMING = 'UPCOMING',
  REGISTRATION_OPEN = 'REGISTRATION_OPEN',
  REGISTRATION_CLOSED = 'REGISTRATION_CLOSED',
  LIVE = 'LIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

@Entity('tournaments')
export class Tournament {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 150 })
  slug: string;

  @Index()
  @Column({ type: 'uuid' })
  host_id: string;

  @ManyToOne(() => User, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'host_id' })
  host: User;

  @Index()
  @Column({ type: 'uuid' })
  sport_id: string;

  @ManyToOne(() => Sport, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'sport_id' })
  sport: Sport;

  @Index()
  @Column({ type: 'uuid' })
  city_id: string;

  @ManyToOne(() => City, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'city_id' })
  city: City;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  series: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', length: 255 })
  venue_name: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  area: string | null;

  @Column({
    type: 'decimal',
    precision: 9,
    scale: 6,
    nullable: true,
    transformer: numericTransformer,
  })
  latitude: number | null;

  @Column({
    type: 'decimal',
    precision: 9,
    scale: 6,
    nullable: true,
    transformer: numericTransformer,
  })
  longitude: number | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  google_place_id: string | null;

  @Column({ type: 'text', nullable: true })
  map_place_url: string | null;

  @Column({ type: 'text', nullable: true })
  poster_url: string | null;

  @Column({ type: 'varchar', length: 30, default: 'emerald' })
  poster_theme: string;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
    transformer: numericTransformer,
  })
  prize_pool: number;

  @Column({ type: 'jsonb', nullable: true })
  prize_breakdown: Record<string, any> | null;

  @Column({
    type: 'enum',
    enum: TournamentStatus,
    default: TournamentStatus.DRAFT,
  })
  status: TournamentStatus;

  @Column({ type: 'boolean', default: false })
  is_featured: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  registration_opens_at: Date | null;

  @Column({ type: 'timestamptz' })
  registration_closes_at: Date;

  @Column({ type: 'timestamptz' })
  starts_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  ends_at: Date | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  contact_phone: string | null;

  @Column({ type: 'text', nullable: true })
  rules_summary: string | null;

  @Column({ type: 'jsonb', nullable: true })
  faqs: Record<string, any>[] | null;

  @Column({ type: 'text', nullable: true })
  refund_policy: string | null;

  @Column({ type: 'int', default: 15 })
  min_rest_minutes: number;

  @Column({ type: 'boolean', default: false })
  is_suspended: boolean;

  @Column({ type: 'text', nullable: true })
  suspension_reason: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @OneToMany(() => TournamentCategory, (category) => category.tournament, {
    cascade: true,
  })
  categories: TournamentCategory[];
}
