import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Item } from './item.entity';
import { User } from './user.entity';
import { OrderStatusEnum } from 'src/enums/OrderStatusEnum';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ type: 'float', default: 0.0 })
  subtotal: number;

  @Column({ type: 'float', default: 0.0 })
  discount: number;

  @Column({ type: 'float', default: 0.0 })
  shipping: number;

  @Column({ type: 'float', default: 0.0 })
  total: number;

  @Column({ type: 'timestamp', nullable: true })
  deliveryDate: Date;

  @Column({
    type: 'enum',
    nullable: false,
    default: OrderStatusEnum.PENDING,
    enum: OrderStatusEnum,
  })
  status: OrderStatusEnum;

  @OneToMany(() => Item, (item) => item.id)
  items: Item[];

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
