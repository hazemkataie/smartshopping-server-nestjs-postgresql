import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { MarketService } from './market.service';
import { Market } from './entities/market.entity';
import { CreateMarketDto } from './dto/create-market.dto';

@Controller('markets')
export class MarketController {
    constructor(private readonly marketService: MarketService) { }

    @Post()
    create(@Body() data: CreateMarketDto) {
        return this.marketService.create(data);
    }

    @Get()
    findAll() {
        return this.marketService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.marketService.findOne(+id);
    }

    //   @Patch(':id')
    //   update(@Param('id') id: string, @Body() data: Partial<Market>) {
    //     return this.marketService.update(+id, data);
    //   }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.marketService.remove(+id);
    }
}
