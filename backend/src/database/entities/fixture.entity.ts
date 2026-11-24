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

@Entity('fixtures')
export class Fixture {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ type: 'uuid' })
  category_id: string;

  @OneToOne(() => TournamentCategory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: TournamentCategory;

  @Column({ type: 'jsonb' })
  bracket_data: Record<string, any>;

  @Column({ type: 'boolean', default: false })
  is_locked: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
