import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { numericTransformer } from '../transformers/numeric.transformer';

export enum PlayingLevel {
  BEGINNER = 'BEGINNER',
  AMATEUR = 'AMATEUR',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  PRO = 'PRO',
}

export enum DominantHand {
  RIGHT = 'RIGHT',
  LEFT = 'LEFT',
}

@Entity('player_profiles')
export class PlayerProfile {
  @PrimaryColumn('uuid')
  user_id: string;

  @OneToOne(() => User, (user) => user.player_profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'enum',
    enum: PlayingLevel,
    default: PlayingLevel.BEGINNER,
  })
  playing_level: PlayingLevel;

  @Column({ type: 'varchar', length: 100, nullable: true })
  play_style: string | null;

  @Column({
    type: 'enum',
    enum: DominantHand,
    default: DominantHand.RIGHT,
  })
  dominant_hand: DominantHand;

  @Column({ type: 'varchar', length: 100, nullable: true })
  area: string | null;

  @Column({ type: 'text', array: true, nullable: true })
  preferred_categories: string[] | null;

  @Column({ type: 'int', nullable: true })
  circuit_rank: number | null;

  @Column({ type: 'int', default: 1200 })
  rating: number;

  @Column({ type: 'int', default: 0 })
  tournaments_played: number;

  @Column({ type: 'int', default: 0 })
  titles_won: number;

  @Column({ type: 'int', default: 0 })
  matches_played: number;

  @Column({ type: 'int', default: 0 })
  matches_won: number;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 100.0,
    transformer: numericTransformer,
  })
  reliability_score: number;

  @Column({ type: 'text', nullable: true })
  bio: string | null;

  @Column({ type: 'boolean', default: false })
  is_verified: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
