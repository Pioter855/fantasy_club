import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CategoryDto {
  @IsString()
  @Length(3, 100)
  @IsNotEmpty()
  name: string;
}
