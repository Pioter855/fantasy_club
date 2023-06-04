import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignDto } from './dto/sign.dto';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
  private jwtService: JwtService
  ) {}

  async signIn(signDto: SignDto): Promise<any> {
    const { password , email } = signDto
    const user = await this.usersService.findByEmail(email);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    }

  }

  async singUp(singDto: SignDto) {
    const {password, email, username } = singDto
    const hash = await argon.hash(password)
    return await this.usersService.create(email,username,hash)

  }
}