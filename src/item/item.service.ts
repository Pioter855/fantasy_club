import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { Repository } from 'typeorm';
import { ItemDto } from './dto/item.dto';
import { User } from '../user/user.entity';
import { AuthorService } from '../author/author.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ItemService {
  private dataSource: any;
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    private readonly authorService: AuthorService,
    private readonly categoryService: CategoryService
  ) {}

  async create(body: ItemDto, userId: User['id']): Promise<Item> {
    const authors = await this.getAuthors(body);
    const categories = await this.getCategories(body)



    //pierwszy zapis create

    //const item = this.itemRepository.create({ ...body , user:{id: userId}, authors});
    // item.authors = authors;

    // drugi zapis create

    const item = new Item();
    Object.assign(item, body);
    item.authors = authors;
    item.categories = categories
    item.user = { id: userId } as User;
    return this.itemRepository.save(item);
  }

  async getAuthors(body) {
    let authors = [];
    if (body.authorIds.length > 0) {
      authors = await this.authorService.findAuthorsByIds(body.authorIds);
      if (authors.length !== body.authorIds.length) {
        throw new Error();
      }
    }
    return authors;
  }

  async getCategories(body){
    let categories = []
    if(body.categoryIds.length > 0) {
      categories = await this.categoryService.findCategoryByIds(body.categoryIds)
      if(categories.length !== body.categoryIds.length) {
        throw new Error()
      }
    }
    return categories
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
