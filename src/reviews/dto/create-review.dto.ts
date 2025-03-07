import { IsDate, IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString, Validate, ValidateIf, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint()
export class ValidateStar implements ValidatorConstraintInterface {
  validate(star: number) {
    return star % 0.5 == 0;
  }
}

export class CreateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  restaurant_id: number;

  @IsNotEmpty()
  @IsString()
  review: string;

  @IsNotEmpty()
  @IsDecimal()
  @Validate(ValidateStar)
  star: number;

  @IsOptional()
  @IsDate()
  date: Date;
}
