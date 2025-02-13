import { IsString } from 'class-validator';

export class CreateWishDto {
  @IsString()
  houseId: string;
}