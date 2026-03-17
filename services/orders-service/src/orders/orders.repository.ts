import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { Product } from './models/product.model';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,
  ) {}

  async findAll(): Promise<Order[]> {
    return await this.orderModel.findAll({ include: [Product] });
  }

  async create(order: Partial<Order>): Promise<Order> {
    return await this.orderModel.create(order);
  }
}
