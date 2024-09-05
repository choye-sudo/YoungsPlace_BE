import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DetailInfoController } from './detail_info.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { DetailInfoService } from './detail_info.service';
import { ProvinceModule } from './province/province.module';
import { CityModule } from './city/city.module';
import { RecruitmentStatusModule } from './recruitment-status/recruitment-status.module';
import { PrismaModule } from './prisma/prisma.module';
import { SaveModule } from './save/save.module';

@Module({
  imports: [ProvinceModule, CityModule, RecruitmentStatusModule, PrismaModule, SaveModule],
  controllers: [AppController, DetailInfoController],
  providers: [AppService, DetailInfoService, PrismaService],
})
export class AppModule {}