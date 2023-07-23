import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class RatingDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  value: number;
}
