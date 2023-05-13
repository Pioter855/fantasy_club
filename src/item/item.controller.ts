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

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(@Body() body: ItemDto): Promise<Item> {
    return this.itemService.create(body);
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
