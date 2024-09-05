// src/module/complex.module.ts

import { Module } from '@nestjs/common';
import { PrismaService } from '../service/prisma.service';
import { DetailInfoService } from '../service/detail_info.service';
import { DetailInfoController } from '../controller/detail_info.controller';

@Module({
  controllers: [DetailInfoController],
  providers: [DetailInfoService, PrismaService],
})
export class ComplexModule {}
