import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { Repository } from 'typeorm';
import { ItemDto } from './dto/item.dto';
import { User } from '../user/user.entity';


@Injectable()
export class ItemService {
  private dataSource: any;
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(body: ItemDto, userId : User['id'] ): Promise<Item> {
    const item = this.itemRepository.create({ ...body , user:{id: userId} })
    return this.itemRepository.save(item);
  }

  async getOne(id: number): Promise<Item> {
    const item = await this.itemRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('Item doesnt exist');
    }
    return item;
  }

  get(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  async update(id: number, body: ItemDto): Promise<Item> {
    const item = await this.getOne(id);
    const merge = this.itemRepository.merge(item, body);
    return this.itemRepository.save(merge);
  }

  async remove(id: number): Promise<Item> {
    const item = await this.getOne(id);
    return this.itemRepository.remove(item);
  }
}
