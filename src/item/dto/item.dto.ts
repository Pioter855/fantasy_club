import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  Length,
} from 'class-validator';

export class ItemDto {
  @IsArray()
  authorIds?: number[];

  @IsString()
  @Length(2, 255)
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsArray()
  categoryIds?: number[];
}
