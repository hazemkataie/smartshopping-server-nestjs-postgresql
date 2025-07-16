import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Market } from 'src/market/entities/market.entity';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Market)
    private readonly marketRepository: Repository<Market>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}


  async create(createProductDto: CreateProductDto) {
  const market = await this.marketRepository.findOne({ where: { id: createProductDto.marketId } });
  const category = await this.categoryRepository.findOne({ where: { id: createProductDto.categoryId } });

  const product = this.productRepository.create(
    {
      name: createProductDto.name,
      isBought: createProductDto.isBought ?? false,
      market,
      category,
    }
  );
  return this.productRepository.save(product);
}


  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
