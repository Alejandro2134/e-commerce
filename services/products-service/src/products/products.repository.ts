import { Injectable } from '@nestjs/common';
import { Product } from './models/product.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productModel.findAll();
  }

  async create(product: Partial<Product>): Promise<Product> {
    return await this.productModel.create(product);
  }
}
