import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { RecruitmentStatusService } from './recruitment-status.service';
import { RecruitmentStatusController } from './recruitment-status.controller';

@Module({
  imports: [PrismaModule],
  providers: [RecruitmentStatusService],
  controllers: [RecruitmentStatusController]
})
export class RecruitmentStatusModule {}
