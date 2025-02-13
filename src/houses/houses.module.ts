import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule'; // 스케줄링 모듈 추가
import { HousesService } from './houses.service';
import { HousesRepository } from './houses.repository';
import { HousesController } from './houses.controller';
import { HousesScheduler } from './houses.scheduler';
import { HousesExternalService } from './houses.external.service';
import { PrismaModule } from '../prisma/prisma.module'; // Prisma 모듈 추가

@Module({
  imports: [ScheduleModule.forRoot(), PrismaModule], // 스케줄링 및 Prisma 모듈 추가
  controllers: [HousesController], // 컨트롤러 등록
  providers: [
    HousesService,
    HousesRepository,
    HousesExternalService,
    HousesScheduler,
  ], // 서비스 등록
})
export class HousesModule {}
