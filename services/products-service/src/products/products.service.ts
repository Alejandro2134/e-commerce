import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './models/product.model';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async findAll() {
    return await this.productsRepository.findAll();
  }

  async create(product: Partial<Product>) {
    return await this.productsRepository.create(product);
  }
}
