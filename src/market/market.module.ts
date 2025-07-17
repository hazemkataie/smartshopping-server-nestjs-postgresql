import { Module } from '@nestjs/common';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Market } from '../market/entities/market.entity';
import { Category } from 'src/category/entities/category.entity';
import { Product } from '../product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Market, Category, Product])],
  providers: [MarketService],
  controllers: [MarketController]
})
export class MarketModule { }
