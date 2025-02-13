import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HousesService } from './houses.service';

@Injectable()
export class HousesScheduler {
  constructor(private readonly housesService: HousesService) {}

  @Cron('0 0 * * 0') // 매주 일요일 00:00 실행
  async syncHouses() {
    console.log('🏠 [스케줄링] 주택 데이터를 동기화 중...');
    await this.housesService.syncHouses();
    console.log('✅ [스케줄링 완료] 주택 데이터 업데이트 완료!');
  }
}
