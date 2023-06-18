import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { AuthorModule } from '../author/author.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [AuthorModule, TypeOrmModule.forFeature([Item]), CategoryModule],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
