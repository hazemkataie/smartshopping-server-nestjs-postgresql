import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Market } from '../../market/entities/market.entity';
import { Category } from '../../category/entities/category.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ default: false })
  isBought!: boolean;

  @ManyToOne(() => Market, (market) => market.products, { eager: true })
  market!: Market;

  @ManyToOne(() => Category, (category) => category.products, { eager: true })
  category!: Category;

  @ManyToOne(() => User, (user) => user.products, { eager: true })
  user!: User;
}
