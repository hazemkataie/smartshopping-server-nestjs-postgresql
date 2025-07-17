import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Product } from '../product/entities/product.entity';
import { Market } from '../market/entities/market.entity';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [TypeOrmModule.forFeature([Category, Product, Market])],
})
export class CategoryModule { }
