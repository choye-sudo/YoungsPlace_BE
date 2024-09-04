import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule'; // 매주 일요일마다 공공데이터 api를 부르기 위한 스케쥴러 모듈 추가(NestJS 스케줄 패키지를 설치할 필요가 있음)
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ApiService } from './service/api.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, PrismaService, ApiService],
})
export class AppModule {}
