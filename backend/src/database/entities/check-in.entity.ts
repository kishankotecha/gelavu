import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Tournament } from './tournament.entity';
import { User } from './user.entity';

@Entity('check_ins')
@Index('uq_tournament_player_checkin', ['tournament_id', 'player_id'], {
  unique: true,
})
export class CheckIn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  tournament_id: string;

  @ManyToOne(() => Tournament, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tournament_id' })
  tournament: Tournament;

  @Index()
  @Column({ type: 'uuid' })
  player_id: string;

  @ManyToOne(() => User, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'player_id' })
  player: User;

  @Column({ type: 'varchar', length: 30, default: 'QR_CODE' })
  method: string; // QR_CODE, HOST_OVERRIDE

  @Index()
  @Column({ type: 'uuid', nullable: true })
  checked_in_by: string | null;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'checked_in_by' })
  checker: User | null;

  @CreateDateColumn({ type: 'timestamptz' })
  checked_in_at: Date;
}
