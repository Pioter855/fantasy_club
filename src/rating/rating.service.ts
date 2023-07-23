import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Rating } from './rating.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
  ) {}

  async create(id, userId, value): Promise<Rating> {
    const existingRating = await this.ratingRepository.findOne({
      where: {
        user: { id: userId },
        items: { id },
      },
    });
    if (existingRating) {
      throw new Error();
    }
    const rating = this.ratingRepository.create({
      items: { id },
      user: { id: userId },
      value,
    });

    return this.ratingRepository.save(rating);
  }
}
