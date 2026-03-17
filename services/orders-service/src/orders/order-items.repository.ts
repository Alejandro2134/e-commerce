import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderItems } from './models/order_items.model';

@Injectable()
export class OrderItemsRepository {
  constructor(
    @InjectModel(OrderItems)
    private orderItemsModel: typeof OrderItems,
  ) {}

  async create(orderItem: Partial<OrderItems>): Promise<OrderItems> {
    return await this.orderItemsModel.create(orderItem);
  }
}
