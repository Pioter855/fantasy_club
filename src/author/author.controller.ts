import { Body, Controller, Post, Get } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorDto } from './dto/author.dto';
import { Public } from '../common/dekorators/public.decorator';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Public()
  @Post()
  Create(@Body() body: AuthorDto) {
    return this.authorService.create(body);
  }

  @Public()
  @Get()
  Get() {
    return this.authorService.get();
  }
}
