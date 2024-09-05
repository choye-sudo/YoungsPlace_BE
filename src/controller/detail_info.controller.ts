import { Controller, Get, Param } from '@nestjs/common';
import { DetailInfoService } from '../service/detail_info.service';

@Controller('detail_info')
export class DetailInfoController {
  constructor(private readonly complexService: DetailInfoService) {}

  // 단지 정보 가져오기
  @Get('complex/:complexName')
  async getComplexInformation(@Param('complexName') complexName: string) {
    return this.complexService.getComplexInformation(complexName);
  }

  // 주택형별 정보 가져오기
  @Get('complex_type/:complexName')
  async getComplexTypeInformation(@Param('complexName') complexName: string) {
    console.log('GET /complex_type/:complexName endpoint hit with:', complexName);
    return this.complexService.getComplexTypeInformation(complexName);
  }

  // 공고 정보 가져오기
  @Get('subscription/:complexName')
  async getSubscriptionInformation(@Param('complexName') complexName: string) {
    console.log('GET /subscription/:complexName endpoint hit with:', complexName);
    return this.complexService.getSubscriptionInformation(complexName);
  }
}
