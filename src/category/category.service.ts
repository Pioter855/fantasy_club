import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Category } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDto } from './dto/category.dto';
import { ErrorCategoryInterface } from '../common/interfaces/error-category.interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(body: CategoryDto): Promise<Category | ErrorCategoryInterface> {
    const { name } = body;
    const existingCategory = await this.categoryRepository.findOne({
      where: { name },
    });

    if (existingCategory) {
      return { category: 'Author already exist' };
    }

    const category = await this.categoryRepository.create(body);

    return await this.categoryRepository.save(category);
  }

  async findCategoryByIds(ids: number[]): Promise<Category[]> {
    return await this.categoryRepository.find({
      where: {
        id: In(ids),
      },
    });
  }
}
