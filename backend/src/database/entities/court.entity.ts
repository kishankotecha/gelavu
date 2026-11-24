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
import { Tournament } from './tournament.entity';

@Entity('courts')
@Index('uq_tournament_court_number', ['tournament_id', 'court_number'], {
  unique: true,
})
export class Court {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  tournament_id: string;

  @ManyToOne(() => Tournament, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tournament_id' })
  tournament: Tournament;

  @Column({ type: 'varchar', length: 50 })
  court_number: string; // e.g. "Court 1", "Court 2"

  @Column({ type: 'varchar', length: 50, default: 'Synthetic' })
  surface_type: string;

  @Column({ type: 'varchar', length: 20, default: 'IDLE' })
  status: string; // IDLE, IN_MATCH, MAINTENANCE

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
