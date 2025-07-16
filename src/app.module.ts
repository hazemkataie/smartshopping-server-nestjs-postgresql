import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Market } from './market/market.entity';
import { MarketModule } from './market/market.module';

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
    TypeOrmModule.forFeature([Market]),
    MarketModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
