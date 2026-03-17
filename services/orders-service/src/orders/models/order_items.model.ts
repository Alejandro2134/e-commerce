import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Product } from './product.model';
import { Order } from './order.model';

@Table
export class OrderItems extends Model {
  @ForeignKey(() => Product)
  @Column
  declare product_id: number;

  @ForeignKey(() => Order)
  @Column
  declare order_id: number;

  @Column
  declare quantity: number;

  @Column
  declare total: number;
}
