import { Injectable } from '@nestjs/common';
import { OrderRepository } from './orders.repository';
import { Product } from './models/product.model';
import { OrderItemsRepository } from './order-items.repository';
import { CreateOrderDTO } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private orderRepository: OrderRepository,
    private orderItemsRepository: OrderItemsRepository,
  ) {}

  async findAll() {
    return await this.orderRepository.findAll();
  }

  async create(productsInfo: Product[], orderItems: CreateOrderDTO) {
    const order = await this.orderRepository.create({
      total: productsInfo.reduce((sum, product) => sum + product.price, 0),
    });

    for (const orderItem of orderItems.items) {
      const product = productsInfo.find((p) => p.id === orderItem.productId);

      if (product) {
        await this.orderItemsRepository.create({
          quantity: orderItem.quantity,
          product_id: product.id,
          order_id: order.id,
          total: product.price * orderItem.quantity,
        });
      }
    }

    return order;
  }
}
