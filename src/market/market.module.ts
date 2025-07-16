import { Module } from '@nestjs/common';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Market } from './market.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Market])],
  providers: [MarketService],
  controllers: [MarketController]
})
export class MarketModule {}
