import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Public } from '../common/dekorators/public.decorator';
import { CategoryDto } from './dto/category.dto';
import { Category } from './category.entity';
import { ErrorCategoryInterface } from '../common/interfaces/error-category.interface';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Public()
  @Post()
  create(
    @Body() body: CategoryDto,
  ): Promise<Category | ErrorCategoryInterface> {
    return this.categoryService.create(body);
  }
}
