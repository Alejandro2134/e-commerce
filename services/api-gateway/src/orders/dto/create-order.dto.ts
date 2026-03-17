import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  Min,
  ValidateNested,
} from 'class-validator';

class OrderItemDTO {
  @ApiProperty()
  @IsInt()
  @Min(1)
  productId: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateOrderDTO {
  @ApiProperty({ type: [OrderItemDTO] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  items: OrderItemDTO[];
}
