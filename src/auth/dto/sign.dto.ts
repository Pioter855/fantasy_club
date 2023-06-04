import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class SignDto {
  @IsString()
  @Length(3, 100)
  @IsNotEmpty()
  email: string;
  @IsString()
  @Length(3, 100)
  @IsNotEmpty()
  username: string;
  @IsString()
  @Length(3, 100)
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  )
  password: string;
}