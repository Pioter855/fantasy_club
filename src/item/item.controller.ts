import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemDto } from './dto/item.dto';
import { Item } from './item.entity';
import { CurrentUser } from '../common/dekorators/current-user.decorator';
import { TokenPayload } from '../common/interfaces/token-payload.interface';
import { create } from 'domain';
import { RatingDto } from '../rating/dto/rating.dto';
import { Public } from '../common/dekorators/public.decorator';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { Rating } from '../rating/rating.entity';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(
    @CurrentUser() { sub: userId }: TokenPayload,
    @Body() body: ItemDto,
  ): Promise<Item> {
    return this.itemService.create(body, userId);
  }
  @Post('/:id/user')
  createRatingForItem(
    @CurrentUser() { sub: userId }: TokenPayload,
    @Param('id') id: number,
    @Body() { value }: RatingDto,
  ): Promise<Rating> {
    return this.itemService.rate(id, userId, value);
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
  @Public()
  @Delete('/:id')
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.itemService.delete(id);
  }
}
