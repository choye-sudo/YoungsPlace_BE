import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvinceModule } from './province/province.module';
import { CityModule } from './city/city.module';
import { RecruitmentStatusModule } from './recruitment-status/recruitment-status.module';
import { PrismaModule } from './prisma/prisma.module';
import { SaveModule } from './save/save.module';

@Module({
  imports: [ProvinceModule, CityModule, RecruitmentStatusModule, PrismaModule, SaveModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}