import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignDto } from './dto/sign.dto';
import { AuthGuard } from './auth.guard';
import { Public } from '../common/dekorators/public.decorator';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('singIn')
  signIn(@Body() signDto: SignDto): Promise<{ user: User; accessToken }> {
    return this.authService.signIn(signDto);
  }
  @Public()
  @Post('singUp')
  singUp(@Body() singDto: SignDto): Promise<User> {
    return this.authService.singUp(singDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req): any {
    return req.user;
  }
}
