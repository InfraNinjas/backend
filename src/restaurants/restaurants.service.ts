import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Repository } from 'typeorm';
import { Review } from 'src/reviews/entities/review.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantsRepository: Repository<Restaurant>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    
    const newRestaurant = this.restaurantsRepository.create(createRestaurantDto)
    const restaurant = await this.restaurantsRepository.save(newRestaurant);
    const newReview = this.reviewRepository.create({
      review: createRestaurantDto.review,
      star: createRestaurantDto.star,
      restaurant
    })
    await this.reviewRepository.save(newReview)
    return restaurant
  }

  async findAll() {
    return await this.restaurantsRepository.find() 
  }

  async findOne(id: number) {
    const reviews = (await this.restaurantsRepository.findOne({
      where: {
        id
      },
      relations: ['reviews']
    }))
    console.log(reviews)
    return reviews
  }

  // update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
  //   return `This action updates a #${id} restaurant`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} restaurant`;
  // }
}
