import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDTO } from './dto/create-product.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    @Inject('PRODUCTS_SERVICE') private readonly productsClient: ClientProxy,
  ) {}

  @Get()
  findAll() {
    return this.productsClient.send({ cmd: 'get_products' }, {});
  }

  @Post()
  create(@Body() createProductDTO: CreateProductDTO) {
    return this.productsClient.send(
      { cmd: 'create_product' },
      createProductDTO,
    );
  }
}
