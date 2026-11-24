import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Team } from './team.entity';
import { User } from './user.entity';
import { Registration } from './registration.entity';

@Entity('team_members')
@Index('uq_team_member', ['team_id', 'user_id'], { unique: true })
export class TeamMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  team_id: string;

  @ManyToOne(() => Team, (team) => team.members, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @Index()
  @Column({ type: 'uuid' })
  user_id: string;

  @ManyToOne(() => User, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Index()
  @Column({ type: 'uuid', nullable: true })
  registration_id: string | null;

  @ManyToOne(() => Registration, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'registration_id' })
  registration: Registration | null;

  @Column({ type: 'boolean', default: false })
  is_captain: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
