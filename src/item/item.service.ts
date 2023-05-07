import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { Repository } from 'typeorm';
import { ItemDto } from './dto/item.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(body: ItemDto): Promise<Item> {
    const item = await this.itemRepository.create(body);
    return this.itemRepository.save(item);
  }

  async getOne(id: number): Promise<Item> {
    const item = await this.itemRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException('Item does not exist');
    }
    return item;
  }

  get(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  async update(id: number, body: ItemDto): Promise<Item> {
    const item = await this.getOne(id);
    const merge = await this.itemRepository.merge(item, body);
    return this.itemRepository.save(merge);
  }

  async remove(id: number): Promise<Item> {
    const item = await this.getOne(id);
    return this.itemRepository.remove(item);
  }
}
