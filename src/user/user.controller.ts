import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from '../common/dekorators/current-user.decorator';
import { TokenPayload } from '../common/interfaces/token-payload.interface';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly serService: UserService) {}

  @Get('items')
  get(@CurrentUser() user : TokenPayload) : Promise<User[]>{
    return this.serService.get(user)
  }
}
