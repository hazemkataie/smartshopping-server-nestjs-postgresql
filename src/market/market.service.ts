import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Market } from './market.entity';

@Injectable()
export class MarketService {
  constructor(
    @InjectRepository(Market)
    private marketRepository: Repository<Market>,
  ) {}

  create(marketData: Partial<Market>) {
    const market = this.marketRepository.create(marketData);
    return this.marketRepository.save(market);
  }

  findAll() {
    return this.marketRepository.find();
  }

  findOne(id: number) {
    return this.marketRepository.findOneBy({ id });
  }

  update(id: number, updateData: Partial<Market>) {
    return this.marketRepository.update(id, updateData);
  }

  remove(id: number) {
    return this.marketRepository.delete(id);
  }
}
