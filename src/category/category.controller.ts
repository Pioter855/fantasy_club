import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Public } from '../common/dekorators/public.decorator';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Public()
  @Post()
  create(@Body() body: CategoryDto) {
    return this.categoryService.create(body);
  }
}
