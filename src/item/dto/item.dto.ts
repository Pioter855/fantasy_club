import { IsNumber, IsString } from 'class-validator';

export class ItemDto {
  @IsString()
  author: string;
  @IsString()
  title: string;
  @IsNumber()
  price: number;
  @IsString()
  category: string;
}
