import { IsString } from 'class-validator';

export class SearchHousesDto {
  @IsString()
  keyword: string;
}
