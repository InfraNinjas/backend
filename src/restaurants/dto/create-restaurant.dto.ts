import { IsDecimal, IsNotEmpty, IsString } from "class-validator";

export class CreateRestaurantDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDecimal()
  x: number;

  @IsNotEmpty()
  @IsDecimal()
  y: number;
}
