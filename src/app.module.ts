import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { MarketModule } from './market/market.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { Category } from './category/entities/category.entity';
import { Market } from './market/entities/market.entity';
import { Product } from './product/entities/product.entity';
import { User } from './user/entities/user.entity';

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
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Market, Category, Product, User]),
    MarketModule,
    CategoryModule,
    ProductModule,
    UserModule,
  ],
})
export class AppModule { }
