import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Item } from './item.entity';
import { Photo } from './photo.entity';
import { Category } from './category.entity';
import { User } from './user.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'float', nullable: false })
  price: number;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'integer', default: 0 })
  searchScore: number;

  @Column({ type: 'integer', default: 0 })
  buyingScore: number;

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'owner_id', referencedColumnName: 'id' })
  owner: User;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: Array<Category>;

  @OneToOne(() => Photo, (photo) => photo.product)
  @JoinColumn({ name: 'image_id', referencedColumnName: 'id' })
  image: Photo;

  @ManyToMany(() => Item, (item) => item.products)
  items: Array<Item>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
