import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDTO } from './dto/create-order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(
    @Inject('ORDERS_SERVICE') private readonly ordersClient: ClientProxy,
  ) {}

  @Get()
  findAll() {
    return this.ordersClient.send({ cmd: 'get_orders' }, {});
  }

  @Post()
  create(@Body() createOrderDTO: CreateOrderDTO) {
    return this.ordersClient.send({ cmd: 'create_order' }, createOrderDTO);
  }
}
