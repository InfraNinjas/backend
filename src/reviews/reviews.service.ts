import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Restaurant)
    private readonly restaurantsRepository: Repository<Restaurant>
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const newReview = this.reviewRepository.create(createReviewDto)
    const result = await this.restaurantsRepository.findOne({
      where: {
        id: createReviewDto.restaurant_id
      }
    })
    if(result == null) return 'err'
    console.log(result)
    newReview.restaurant = result
    return await this.reviewRepository.save(newReview)
  }

  async findAll() {
    return await this.reviewRepository.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} review`;
  // }

  // update(id: number, updateReviewDto: UpdateReviewDto) {
  //   return `This action updates a #${id} review`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} review`;
  // }
}
