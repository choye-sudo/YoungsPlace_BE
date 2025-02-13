import { Controller, Get, Param, Query, Post, Delete, Body, UsePipes } from '@nestjs/common';
import { HousesService } from './houses.service';
import { FilterHousesDto } from './dto/filter-houses.dto';
import { SearchHousesDto } from './dto/search-houses.dto';
import { CreateWishDto } from './dto/create-wish.dto';
import { ValidationPipe } from '../pipes/validation.pipe';

@Controller('houses')
export class HousesController {
  constructor(private readonly housesService: HousesService) {}

  //전체 청약 주택 목록 조회
  @Get()
  getAllHouses() {
    return this.housesService.getAllHouses();
  }

  //특정 ID로 청약 주택 조회
  @Get(':id')
  getHouseById(@Param('id') id: string) {
    return this.housesService.getHouseById(id);
  }

  //필터링 (location, status 등)
  @Get('filter')
  filterHouses(@Query() filterDto: FilterHousesDto) {
    return this.housesService.filterHouses(filterDto);
  }

  //키워드 기반 청약 주택 검색
  @Get('search')
  searchHouses(@Query() searchDto: SearchHousesDto) {
    return this.housesService.searchHouses(searchDto);
  }

  //찜 목록 조회
  @Get('wish')
  getWishList() {
    return this.housesService.getWishList();
  }

  //찜하기 추가
  @Post('wish')
  addWish(@Body() createWishDto: CreateWishDto) {
    return this.housesService.addWish(createWishDto);
  }

  //찜하기 삭제
  @Delete('wish/:id')
  removeWish(@Param('id') id: string) {
    return this.housesService.removeWish(id);
  }
}
