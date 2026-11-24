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
  Check,
} from 'typeorm';
import { Fixture } from './fixture.entity';
import { TournamentCategory } from './tournament-category.entity';
import { Team } from './team.entity';
import { Court } from './court.entity';
import { User } from './user.entity';
import { MatchGame } from './match-game.entity';

export enum MatchStage {
  GROUP = 'GROUP',
  KNOCKOUT = 'KNOCKOUT',
}

export enum MatchStatus {
  SCHEDULED = 'SCHEDULED',
  CALLED = 'CALLED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  WALKOVER = 'WALKOVER',
  FORFEIT = 'FORFEIT',
}

@Entity('matches')
@Index('idx_matches_court_schedule', ['court_id', 'scheduled_time'])
@Check('chk_next_match_slot', 'next_match_slot IS NULL OR next_match_slot IN (1, 2)')
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  fixture_id: string;

  @ManyToOne(() => Fixture, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fixture_id' })
  fixture: Fixture;

  @Index()
  @Column({ type: 'uuid' })
  category_id: string;

  @ManyToOne(() => TournamentCategory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: TournamentCategory;

  @Column({
    type: 'enum',
    enum: MatchStage,
    default: MatchStage.KNOCKOUT,
  })
  stage: MatchStage;

  @Column({ type: 'varchar', length: 50, nullable: true })
  group_name: string | null;

  @Column({ type: 'varchar', length: 100 })
  round_name: string; // "Round of 32", "Quarter-Finals", etc.

  @Column({ type: 'int' })
  round_order: number;

  @Column({ type: 'int' })
  match_number: number;

  @Index()
  @Column({ type: 'uuid', nullable: true })
  team1_id: string | null;

  @ManyToOne(() => Team, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'team1_id' })
  team1: Team | null;

  @Index()
  @Column({ type: 'uuid', nullable: true })
  team2_id: string | null;

  @ManyToOne(() => Team, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'team2_id' })
  team2: Team | null;

  @Index()
  @Column({ type: 'uuid', nullable: true })
  winner_team_id: string | null;

  @ManyToOne(() => Team, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'winner_team_id' })
  winner_team: Team | null;

  // Transactional SQL-driven bracket advancement:
  @Index()
  @Column({ type: 'uuid', nullable: true })
  next_match_id: string | null;

  @ManyToOne(() => Match, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'next_match_id' })
  next_match: Match | null;

  @Column({ type: 'smallint', nullable: true })
  next_match_slot: number | null; // 1 or 2

  @Index()
  @Column({ type: 'uuid', nullable: true })
  court_id: string | null;

  @ManyToOne(() => Court, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'court_id' })
  court: Court | null;

  @Index()
  @Column({ type: 'uuid', nullable: true })
  umpire_id: string | null;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'umpire_id' })
  umpire: User | null;

  @Column({ type: 'timestamptz', nullable: true })
  scheduled_time: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  actual_start_time: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  actual_end_time: Date | null;

  @Column({
    type: 'enum',
    enum: MatchStatus,
    default: MatchStatus.SCHEDULED,
  })
  status: MatchStatus;

  @Column({ type: 'varchar', length: 30, default: 'NORMAL' })
  outcome_type: string; // NORMAL, WALKOVER, RETIRED, DISQUALIFIED

  @Column({ type: 'text', nullable: true })
  outcome_reason: string | null;

  @Index()
  @Column({ type: 'uuid', nullable: true })
  result_confirmed_by: string | null;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'result_confirmed_by' })
  result_confirmer: User | null;

  @Column({ type: 'timestamptz', nullable: true })
  result_confirmed_at: Date | null;

  @Column({ type: 'varchar', length: 20, default: 'PENDING' })
  player_confirmation_status: string;

  @Column({ type: 'boolean', default: false })
  is_overridden: boolean;

  @Column({ type: 'text', nullable: true })
  override_note: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @OneToMany(() => MatchGame, (game) => game.match, { cascade: true })
  games: MatchGame[];
}
