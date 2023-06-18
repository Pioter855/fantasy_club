import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemDto } from './dto/item.dto';
import { Item } from './item.entity';
import { CurrentUser } from '../common/dekorators/current-user.decorator';
import { TokenPayload } from '../common/interfaces/token-payload.interface';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(@CurrentUser() { sub: userId }: TokenPayload, @Body() body: ItemDto) {
    return this.itemService.create(body, userId);
  }
  @Get('/:id')
  getOne(@Param('id') id: number): Promise<Item> {
    return this.itemService.getOne(id);
  }
  @Get()
  get(): Promise<Item[]> {
    return this.itemService.get();
  }
  @Patch('/:id')
  update(@Body() body: ItemDto, @Param('id') id: number): Promise<Item> {
    return this.itemService.update(id, body);
  }

  @Delete('/:id')
  delete(@Param('id') id: number): Promise<Item> {
    return this.itemService.remove(id);
  }
}
