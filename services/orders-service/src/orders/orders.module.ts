import { Module } from '@nestjs/common';
import { Order } from './models/order.model';
import { OrderItems } from './models/order_items.model';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderRepository } from './orders.repository';
import { OrderItemsRepository } from './order-items.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCTS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'products-service',
          port: 3001,
        },
      },
    ]),
    SequelizeModule.forFeature([Order, OrderItems]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository, OrderItemsRepository],
})
export class OrdersModule {}
