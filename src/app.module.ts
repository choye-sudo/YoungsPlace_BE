import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { HousesModule } from './houses/houses.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ScheduleModule.forRoot(), // 스케줄링 기능 추가
    HousesModule,             // Houses 모듈 추가
    RedisModule,              // Redis 모듈 추가
  ],
})
export class AppModule {}
