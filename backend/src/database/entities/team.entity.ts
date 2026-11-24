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
import { TournamentCategory } from './tournament-category.entity';
import { TeamMember } from './team-member.entity';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  category_id: string;

  @ManyToOne(() => TournamentCategory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: TournamentCategory;

  @Column({ type: 'varchar', length: 150 })
  team_name: string;

  @Column({ type: 'int', nullable: true })
  seed_number: number | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  group_name: string | null;

  @Column({ type: 'boolean', default: false })
  is_bye: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @OneToMany(() => TeamMember, (member) => member.team, { cascade: true })
  members: TeamMember[];
}
