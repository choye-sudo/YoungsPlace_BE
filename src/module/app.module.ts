import { Module } from '@nestjs/common';
//import { ScheduleModule } from '@nestjs/schedule'; // 매주 일요일마다 공공데이터 api를 부르기 위한 스케쥴러 모듈 추가(NestJS 스케줄 패키지를 설치할 필요가 있음)
import { AppController } from '../controller/app.controller';
import { DetailInfoController } from '../controller/detail_info.controller';
import { AppService } from '../app.service';
//import { ApiService } from '../service/api.service';
import { PrismaService } from '../service/prisma.service';
import { DetailInfoService } from '../service/detail_info.service'; // 상세정보 DB에서 받아오기

@Module({
  imports: [],
  controllers: [AppController, DetailInfoController],  // 여기에 DetailInfoController 추가
  providers: [AppService, DetailInfoService, PrismaService],  // 여기에 DetailInfoService와 PrismaService 추가
})
export class AppModule {}


