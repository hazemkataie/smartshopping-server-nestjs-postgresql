import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Market } from './entities/market.entity';
import { CreateMarketDto } from './dto/create-market.dto';

@Injectable()
export class MarketService {
    constructor(
        @InjectRepository(Market)
        private marketRepository: Repository<Market>,
    ) { }

    create(marketData: CreateMarketDto) {
        const market = this.marketRepository.create(marketData);
        return this.marketRepository.save(market);
    }

    findAll() {
        return this.marketRepository.find();
    }

    findOne(id: number) {
        return this.marketRepository.findOneBy({ id });
    }

    remove(id: number) {
        return this.marketRepository.delete(id);
    }
}
