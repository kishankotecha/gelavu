import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Match } from './match.entity';
import { MatchGame } from './match-game.entity';
import { User } from './user.entity';
import { CourtAccessToken } from './court-access-token.entity';

@Entity('score_audit_logs')
@Index('idx_score_audit_match_seq', ['match_id', 'sequence_number'])
export class ScoreAuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Idempotency token for offline mobile courtside retries
  @Index({ unique: true })
  @Column({ type: 'uuid' })
  client_event_id: string;

  @Index()
  @Column({ type: 'uuid' })
  match_id: string;

  @ManyToOne(() => Match, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'match_id' })
  match: Match;

  @Index()
  @Column({ type: 'uuid' })
  game_id: string;

  @ManyToOne(() => MatchGame, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'game_id' })
  game: MatchGame;

  // Nullable for zero-registration QR court umpires (tracked via court_access_token_id)
  @Index()
  @Column({ type: 'uuid', nullable: true })
  actor_id: string | null;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'actor_id' })
  actor: User | null;

  @Index()
  @Column({ type: 'uuid', nullable: true })
  court_access_token_id: string | null;

  @ManyToOne(() => CourtAccessToken, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'court_access_token_id' })
  court_access_token: CourtAccessToken | null;

  @Column({ type: 'int' })
  sequence_number: number;

  @Column({ type: 'varchar', length: 50 })
  action: string; // e.g. POINT_TEAM1, POINT_TEAM2, UNDO, INTERVAL_REACHED

  @Column({ type: 'jsonb' })
  score_snapshot: Record<string, any>;

  @Column({ type: 'timestamptz' })
  client_recorded_at: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
