import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/models/order.model';
import { OrderItems } from './orders/models/order_items.model';
import { Product } from './orders/models/product.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'root',
      password: 'secret',
      database: 'ecommerce_db',
      autoLoadModels: true,
      synchronize: true,
      models: [Order, OrderItems, Product],
    }),
    OrdersModule,
  ],
})
export class AppModule {}
