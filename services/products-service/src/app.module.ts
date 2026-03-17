import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsModule } from './products/products.module';
import { Product } from './products/models/product.model';

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
      models: [Product],
    }),
    ProductsModule,
  ],
})
export class AppModule {}
