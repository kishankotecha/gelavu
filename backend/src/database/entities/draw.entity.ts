import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { TournamentCategory } from './tournament-category.entity';
import { User } from './user.entity';

export enum DrawType {
  PARTNER_DRAW = 'PARTNER_DRAW',
  BRACKET_DRAW = 'BRACKET_DRAW',
}

@Entity('draws')
export class Draw {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  category_id: string;

  @ManyToOne(() => TournamentCategory, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'category_id' })
  category: TournamentCategory;

  @Column({
    type: 'enum',
    enum: DrawType,
    default: DrawType.BRACKET_DRAW,
  })
  draw_type: DrawType;

  @Column({ type: 'varchar', length: 128 })
  verifiable_seed: string;

  @Column({ type: 'varchar', length: 128 })
  proof_hash: string;

  @Column({ type: 'boolean', default: false })
  is_live: boolean;

  @Column({ type: 'boolean', default: false })
  is_locked: boolean;

  @Column({ type: 'int', default: 1 })
  attempt_number: number;

  @Column({ type: 'jsonb' })
  result_snapshot: Record<string, any>;

  @Index()
  @Column({ type: 'uuid' })
  drawn_by: string;

  @ManyToOne(() => User, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'drawn_by' })
  drawer: User;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
