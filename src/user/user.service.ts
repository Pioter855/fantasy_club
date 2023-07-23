import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { TokenPayload } from '../common/interfaces/token-payload.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findOneWithPasswordByEmail(email: string): Promise<User | null> {
    return this.userRepository
      .createQueryBuilder()
      .select('*')
      .where({ email })
      .getRawOne<User>();
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(email, username, hash): Promise<User> {
    const user = await this.findByEmail(email);
    if (user) {
      throw new ConflictException();
    }
    const userEntity = this.userRepository.create({
      email,
      username,
      password: hash,
    });
    return this.userRepository.save(userEntity);
  }

  async get(user: TokenPayload): Promise<User[]> {
    return this.userRepository.find({
      where: { id: user.sub },
      relations: { items: true },
    });
  }
}
