import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { Order } from './order.entity';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcryptjs';
import { Product } from './product.entity';
import { RoleEnum } from '../../enums/RoleEnum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  @IsEmail()
  email: string;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: false,
    select: true,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.USER,
    nullable: false,
  })
  role: RoleEnum;

  @OneToMany(() => Order, (order) => order.user)
  orders: Array<Order>;

  @OneToMany(() => Product, (product) => product.owner)
  products: Array<Product>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  public async passwordHash() {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      throw new InternalServerErrorException('Error on password hash.');
    }
  }
}
