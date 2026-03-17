import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Product extends Model {
  declare id: number;

  @Column
  declare name: string;

  @Column
  declare description: string;

  @Column
  declare price: number;

  @Column
  declare image_url: string;

  @Column
  declare stock: number;
}
