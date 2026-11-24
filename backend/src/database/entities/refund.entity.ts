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
import { Payment } from './payment.entity';
import { Registration } from './registration.entity';
import { User } from './user.entity';
import { numericTransformer } from '../transformers/numeric.transformer';

export enum RefundStatus {
  INITIATED = 'INITIATED',
  PROCESSED = 'PROCESSED',
  FAILED = 'FAILED',
}

@Entity('refunds')
export class Refund {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  payment_id: string;

  @ManyToOne(() => Payment, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'payment_id' })
  payment: Payment;

  @Index()
  @Column({ type: 'uuid' })
  registration_id: string;

  @ManyToOne(() => Registration, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'registration_id' })
  registration: Registration;

  @Index({ unique: true, where: 'gateway_refund_id IS NOT NULL' })
  @Column({ type: 'varchar', length: 100, nullable: true })
  gateway_refund_id: string | null;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: numericTransformer,
  })
  amount: number;

  @Column({ type: 'varchar', length: 100 })
  reason: string; // TOURNAMENT_CANCELLED, PLAYER_WITHDRAWAL, DISPUTE

  @Index()
  @Column({ type: 'uuid', nullable: true })
  initiated_by: string | null;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'initiated_by' })
  initiator: User | null;

  @Column({
    type: 'enum',
    enum: RefundStatus,
    default: RefundStatus.INITIATED,
  })
  status: RefundStatus;

  @Column({ type: 'jsonb', nullable: true })
  webhook_payload: Record<string, any> | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
