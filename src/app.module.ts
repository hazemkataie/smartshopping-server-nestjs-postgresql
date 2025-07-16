import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Market } from './market/entities/market.entity';
import { MarketModule } from './market/market.module';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: "postgres",
      password: "272819",
      database: 'smartshopping',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,}),
    TypeOrmModule.forFeature([Market, Category, Product]),
    MarketModule,
    CategoryModule,
    ProductModule,
    ],
})
export class AppModule {}
