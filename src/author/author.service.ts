import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { Repository } from 'typeorm';
import { AuthorDto } from './dto/author.dto';
import { In } from 'typeorm';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(body: AuthorDto) {
    const { firstName, lastName } = body;
    const existingAuthor = await this.authorRepository.findOne({
      where: { firstName, lastName },
    });
    if (existingAuthor) {
      return { message: 'Author already exist' };
    }
    const author = await this.authorRepository.create(body);
    return await this.authorRepository.save(author);
  }

  get() {
    return this.authorRepository.find();
  }

  async findAuthorsByIds(ids: number[]): Promise<Author[]> {
    return await this.authorRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

}
