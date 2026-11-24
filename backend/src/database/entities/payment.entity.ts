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
import { Registration } from './registration.entity';
import { User } from './user.entity';
import { numericTransformer } from '../transformers/numeric.transformer';

export enum PaymentShare {
  FULL = 'FULL',
  SPLIT_PRIMARY = 'SPLIT_PRIMARY',
  SPLIT_PARTNER = 'SPLIT_PARTNER',
}

export enum PaymentStatus {
  INITIATED = 'INITIATED',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

@Entity('payments')
@Index('uq_payment_gateway_order', ['gateway', 'order_id'], { unique: true })
@Index('uq_payment_gateway_id', ['gateway', 'payment_id'], {
  unique: true,
  where: 'payment_id IS NOT NULL',
})
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  registration_id: string;

  @ManyToOne(() => Registration, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'registration_id' })
  registration: Registration;

  @Index()
  @Column({ type: 'uuid' })
  payer_user_id: string;

  @ManyToOne(() => User, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'payer_user_id' })
  payer: User;

  @Column({ type: 'varchar', length: 30, default: 'RAZORPAY' })
  gateway: string;

  @Column({ type: 'varchar', length: 100 })
  order_id: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  payment_id: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  signature: string | null;

  @Column({
    type: 'enum',
    enum: PaymentShare,
    default: PaymentShare.FULL,
  })
  payment_share: PaymentShare;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: numericTransformer,
  })
  amount: number;

  @Column({ type: 'varchar', length: 10, default: 'INR' })
  currency: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    transformer: numericTransformer,
  })
  platform_fee: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    transformer: numericTransformer,
  })
  host_share: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    transformer: numericTransformer,
  })
  gst_amount: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  invoice_number: string | null;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.INITIATED,
  })
  status: PaymentStatus;

  @Column({ type: 'jsonb', nullable: true })
  webhook_payload: Record<string, any> | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
