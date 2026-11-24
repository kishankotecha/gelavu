import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  Index,
  Check,
} from 'typeorm';
import { Tournament } from './tournament.entity';
import { ScoringRules } from './scoring-rules.entity';
import { numericTransformer } from '../transformers/numeric.transformer';

export enum FixtureFormat {
  KNOCKOUT = 'KNOCKOUT',
  ROUND_ROBIN = 'ROUND_ROBIN',
  GROUPS_AND_KNOCKOUT = 'GROUPS_AND_KNOCKOUT',
}

export enum PartnerMode {
  BYOP = 'BYOP',
  RANDOM_DRAW = 'RANDOM_DRAW',
  NONE = 'NONE',
}

export enum DrawMethod {
  PICKER_WHEEL = 'PICKER_WHEEL',
  RANKED_SEEDING = 'RANKED_SEEDING',
}

export enum FeeUnit {
  PER_PLAYER = 'PER_PLAYER',
  PER_TEAM = 'PER_TEAM',
}

@Entity('tournament_categories')
@Check('chk_slots_limit', 'filled_slots >= 0 AND filled_slots <= max_slots')
export class TournamentCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  tournament_id: string;

  @ManyToOne(() => Tournament, (t) => t.categories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tournament_id' })
  tournament: Tournament;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  category_type: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  skill_level: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  age_group: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  gender: string | null;

  @Column({
    type: 'enum',
    enum: FixtureFormat,
    default: FixtureFormat.KNOCKOUT,
  })
  fixture_format: FixtureFormat;

  @Column({
    type: 'enum',
    enum: PartnerMode,
    default: PartnerMode.NONE,
  })
  partner_mode: PartnerMode;

  @Column({
    type: 'enum',
    enum: DrawMethod,
    default: DrawMethod.RANKED_SEEDING,
  })
  draw_method: DrawMethod;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: numericTransformer,
  })
  entry_fee: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    transformer: numericTransformer,
  })
  platform_fee: number;

  @Column({
    type: 'enum',
    enum: FeeUnit,
    default: FeeUnit.PER_PLAYER,
  })
  fee_unit: FeeUnit;

  @Column({ type: 'int' })
  max_slots: number;

  @Column({ type: 'int', default: 0 })
  filled_slots: number;

  @Column({ type: 'int', nullable: true })
  group_count: number | null;

  @Column({ type: 'int', nullable: true })
  qualifiers_per_group: number | null;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    transformer: numericTransformer,
  })
  early_bird_fee: number | null;

  @Column({ type: 'timestamptz', nullable: true })
  early_bird_deadline: Date | null;

  @Column({ type: 'varchar', length: 20, default: 'OPEN' })
  registration_status: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @OneToOne(() => ScoringRules, (rules) => rules.category, { cascade: true })
  scoring_rules: ScoringRules;
}
