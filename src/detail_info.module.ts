// src/module/complex.module.ts

import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { DetailInfoService } from './detail_info.service';
import { DetailInfoController } from './detail_info.controller';

@Module({
  controllers: [DetailInfoController],
  providers: [DetailInfoService, PrismaService],
})
export class ComplexModule {}
