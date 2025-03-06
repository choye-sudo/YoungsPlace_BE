import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { HousesService } from './houses.service';
import { HousesRepository } from './houses.repository';
import { HousesController } from './houses.controller';
import { HousesScheduler } from './houses.scheduler';
import { HousesExternalService } from './houses.external.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AppConfigService } from '../config/config.service';

@Module({
  imports: [
    ScheduleModule,
    ConfigModule,
    HttpModule,
    PrismaModule,
  ],
  controllers: [HousesController],
  providers: [
    AppConfigService,
    HousesService,
    HousesRepository,
    HousesExternalService,
    HousesScheduler,
  ],
  exports: [HousesService, HousesExternalService, AppConfigService],
})
export class HousesModule {}