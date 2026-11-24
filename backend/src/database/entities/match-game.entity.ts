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
import { Match } from './match.entity';

@Entity('match_games')
@Index('uq_match_set', ['match_id', 'set_number'], { unique: true })
export class MatchGame {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  match_id: string;

  @ManyToOne(() => Match, (m) => m.games, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'match_id' })
  match: Match;

  @Column({ type: 'int' })
  set_number: number;

  @Column({ type: 'int', default: 0 })
  team1_score: number;

  @Column({ type: 'int', default: 0 })
  team2_score: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  starting_server: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  starting_side: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  current_server: string | null;

  @Column({ type: 'uuid', nullable: true })
  winner_team_id: string | null;

  @Column({ type: 'boolean', default: false })
  is_completed: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
