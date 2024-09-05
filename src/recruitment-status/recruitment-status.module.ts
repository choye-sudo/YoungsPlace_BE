import { Module } from '@nestjs/common';
import { RecruitmentStatusService } from './recruitment-status.service';
import { RecruitmentStatusController } from './recruitment-status.controller';

@Module({
  providers: [RecruitmentStatusService],
  controllers: [RecruitmentStatusController]
})
export class RecruitmentStatusModule {}
