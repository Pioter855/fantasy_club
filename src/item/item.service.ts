import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { Repository } from 'typeorm';
import { ItemDto } from './dto/item.dto';
import { User } from '../user/user.entity';
import { AuthorService } from '../author/author.service';
import { CategoryService } from '../category/category.service';
import { RatingService } from '../rating/rating.service';
import { Rating } from '../rating/rating.entity';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { Author } from '../author/author.entity';
import { Category } from '../category/category.entity';

@Injectable()
export class ItemService {
  private dataSource: any;

  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    private readonly authorService: AuthorService,
    private readonly categoryService: CategoryService,
    private readonly ratingService: RatingService,
  ) {}

  async create(body: ItemDto, userId: User['id']): Promise<Item> {
    const item = new Item();
    Object.assign(item, body);
    item.user = { id: userId } as User;

    if (body.authorIds.length > 0) {
      item.authors = await this.getAuthors(body);
    }
    if (body.categoryIds.length > 0) {
      item.categories = await this.getCategories(body);
    }

    return await this.itemRepository.save(item);
  }

  async getAuthors(body): Promise<Author[]> {
    let authors = [];
    if (body.authorIds.length > 0) {
      authors = await this.authorService.findAuthorsByIds(body.authorIds);
      if (authors.length !== body.authorIds.length) {
        throw new Error();
      }
    }
    return authors;
  }

  async getCategories(body): Promise<Category[]> {
    let categories = [];
    if (body.categoryIds.length > 0) {
      categories = await this.categoryService.findCategoryByIds(
        body.categoryIds,
      );
      if (categories.length !== body.categoryIds.length) {
        throw new Error();
      }
    }
    return categories;
  }

  async rate(id, userId: User['id'], value): Promise<Rating> {
    const item = await this.getItem(id);
    if (!item) {
      throw new NotFoundException();
    }
    return this.ratingService.create(id, userId, value);

    // const rate= new Rating()
    // rate.value= value
    // item.ratings.push(rate)
    // await this.itemRepository.save(rate)
  }

  async getItem(id): Promise<Item> {
    const item = await this.itemRepository.findOne({ where: { id } });
    if (!item) {
      throw new Error();
    }
    return item;
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

  async delete(id: number): Promise<DeleteResult> {
    const item = await this.getOne(id);
    return this.itemRepository.delete(item);
  }
}
