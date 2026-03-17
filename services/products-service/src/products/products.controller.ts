import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @MessagePattern({ cmd: 'get_products' })
  async findAll() {
    return await this.productsService.findAll();
  }

  @MessagePattern({ cmd: 'create_product' })
  async create(createProductDTO: CreateProductDTO) {
    return await this.productsService.create(createProductDTO);
  }

  getOne() {
    return 'get one product';
  }
}
