import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class ItemDto {
  @IsString()
  @Length(3, 100)
  @IsNotEmpty()
  author: string;

  @IsString()
  @Length(2, 255)
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @Length(2, 255)
  @IsNotEmpty()
  category: string;
}
