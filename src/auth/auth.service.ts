import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignDto } from './dto/sign.dto';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signDto: SignDto): Promise<{ user: User; accessToken }> {
    const { email, password } = signDto;
    const user = await this.usersService.findOneWithPasswordByEmail(email);
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }
    const pwMatches = await argon.verify(user.password, password);
    if (!pwMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }
    const payload = { email: user.email, sub: user.id };
    delete user.password;
    return {
      user,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async singUp(singDto: SignDto) {
    const { password, email, username } = singDto;
    const hash = await argon.hash(password);
    return await this.usersService.create(email, username, hash);
  }
}
