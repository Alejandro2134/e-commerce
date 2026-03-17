import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Product } from './product.model';
import { OrderItems } from './order_items.model';

@Table
export class Order extends Model {
  declare id: number;

  @Column
  declare total: number;

  @BelongsToMany(() => Product, () => OrderItems)
  declare products: Product[];
}
