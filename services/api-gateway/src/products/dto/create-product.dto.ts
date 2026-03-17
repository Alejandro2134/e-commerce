import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class CreateProductDTO {
  @ApiProperty({ example: 'Guitar' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'A beautiful guitar' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 199.99 })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ example: 'https://example.com/guitar.jpg' })
  @IsUrl()
  image_url: string;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(0)
  stock: number;
}
