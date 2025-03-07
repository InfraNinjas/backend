import { Restaurant } from "src/restaurants/entities/restaurant.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'review'})
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Restaurant, (restaurant) => (restaurant.reviews), {nullable: false})
  @JoinColumn({name: 'restaurant_id', referencedColumnName: 'id'})
  restaurant: Restaurant;

  @Column({width: 100})
  review: string;

  @Column({type: 'float'})
  star: number;

  @Column({default: () => "CURRENT_TIMESTAMP"})
  data: Date;
}

