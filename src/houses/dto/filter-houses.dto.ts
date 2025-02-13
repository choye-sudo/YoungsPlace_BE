import { IsOptional, IsString, IsEnum } from 'class-validator';

export enum HouseStatus {
  OPEN = '공고중',
  CLOSED = '마감',
}

export class FilterHousesDto {
  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsEnum(HouseStatus)
  status?: HouseStatus;
}
