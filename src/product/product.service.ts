import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Market } from '../market/entities/market.entity';
import { Category } from '../category/entities/category.entity';

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


  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { name, isBought, marketId, categoryId } = createProductDto;
    const newProduct = new Product();
    newProduct.name = name;
    newProduct.isBought ? isBought : false; // Default to false if not provided
    const market = await this.marketRepository.findOneBy({ id: marketId });
    if (!market) {
      throw new Error(`Market with ID ${marketId} not found`);
    }
    newProduct.market = market;
    const category = await this.categoryRepository.findOneBy({ id: categoryId });
    if (!category) {
      throw new Error(`Category with ID ${categoryId} not found`);
    }
    newProduct.category = category;
    return this.productRepository.save(newProduct);
  }


  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return product;
  }
}
