import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'webhook_events' })
export class WebhookEvent {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 128 })
  eventId!: string;

  @Column({ type: 'varchar', length: 64 })
  provider!: string;

  @Column({ type: 'varchar', length: 64 })
  eventType!: string;

  @Column({ type: 'varchar', length: 32, default: 'processed' })
  status!: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
