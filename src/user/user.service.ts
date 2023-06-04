import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';





@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>) {
  }


   findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({email})
  }

  async create(email, username, hash) {
    const user = await this.findByEmail(email)
    if(user) {
      throw new ConflictException();
    }
      const userEntity = this.userRepository.create({
      email,
      username,
      password: hash
    })
    return this.userRepository.save(userEntity)
  }
}