import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Market } from '../market/entities/market.entity';
import { Category } from '../category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Market)
    private readonly marketRepository: Repository<Market>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { }


  async create(createProductDto: CreateProductDto, user: User) {
    const product = this.productRepository.create({
      ...createProductDto,
      user,
    });

    return this.productRepository.save(product);
  }


  async findAll(user: User): Promise<Product[]> {
    return this.productRepository.find({ where: { user: { id: user.id } } });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return product;
  }
}
