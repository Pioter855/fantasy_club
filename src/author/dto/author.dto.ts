import { IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthorDto {
  @IsString()
  @Length(3, 100)
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @Length(3, 100)
  @IsNotEmpty()
  lastName: string;
}
