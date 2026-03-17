import { Controller, Inject } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { CreateOrderDTO } from './dto/create-order.dto';
import { Product } from './models/product.model';
import { lastValueFrom } from 'rxjs';

@Controller('products')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    @Inject('PRODUCTS_SERVICE') private readonly productsClient: ClientProxy,
  ) {}

  @MessagePattern({ cmd: 'get_orders' })
  async findAll() {
    return await this.ordersService.findAll();
  }

  @MessagePattern({ cmd: 'create_order' })
  async create(createOrderDTO: CreateOrderDTO) {
    const products = await lastValueFrom(
      this.productsClient.send<Product[]>({ cmd: 'get_products' }, {}),
    );

    return await this.ordersService.create(products, createOrderDTO);
  }
}
