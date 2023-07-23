import { Body, Controller, Post, Get } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorDto } from './dto/author.dto';
import { Public } from '../common/dekorators/public.decorator';
import { Author } from './author.entity';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Public()
  @Post()
  Create(@Body() body: AuthorDto): Promise<Author> {
    return this.authorService.create(body);
  }

  @Public()
  @Get()
  Get(): Promise<Author[]> {
    return this.authorService.get();
  }
}
