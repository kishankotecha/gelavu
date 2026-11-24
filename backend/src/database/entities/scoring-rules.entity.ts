import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { TournamentCategory } from './tournament-category.entity';

@Entity('scoring_rules')
export class ScoringRules {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ type: 'uuid' })
  category_id: string;

  @OneToOne(() => TournamentCategory, (cat) => cat.scoring_rules, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: TournamentCategory;

  @Column({ type: 'int', default: 21 })
  points_per_game: number;

  @Column({ type: 'int', default: 3 })
  best_of_games: number;

  @Column({ type: 'boolean', default: true })
  win_by_two: boolean;

  @Column({ type: 'int', default: 30 })
  max_cap: number;

  @Column({ type: 'int', nullable: true, default: 11 })
  interval_at: number | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
