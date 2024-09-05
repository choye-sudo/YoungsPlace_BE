import { Controller, Get, Param } from '@nestjs/common';
import { SaveService } from './save.service';

@Controller('save')
export class SaveController {
  constructor(private readonly saveService: SaveService) {}

  // 단지명에 해당하는 도로명주소 조회
  @Get(':complexName')
  getComplexInfo(@Param('complexName') complexName: string) {
    return this.saveService.getComplexInfo(complexName);
  }

  // 전체 단지 목록 조회
  @Get()
  getComplexList() {
    return this.saveService.getComplexList();
  }
}
