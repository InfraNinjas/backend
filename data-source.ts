import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  synchronize: false,
  entities: [Restaurant, Review],
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'migrations',
});