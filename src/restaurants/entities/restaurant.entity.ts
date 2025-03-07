import { Review } from "src/reviews/entities/review.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'restaurant'})
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({width: 50})
  name: string;

  @Column({type: 'float'})
  x: number;

  @Column({type: 'float'})
  y: number;

  @OneToMany(type => Review, (review) => review.restaurant)
  reviews: Review[];
}
