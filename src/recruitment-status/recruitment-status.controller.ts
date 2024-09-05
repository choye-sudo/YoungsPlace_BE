import { Controller, Query, Get } from '@nestjs/common';
import { RecruitmentStatusService } from './recruitment-status.service';

@Controller('recruitment-status')
export class RecruitmentStatusController {
  constructor(private readonly recruitmentStatusService: RecruitmentStatusService) {}

  // 기본 상태는 전체
  @Get()
  async getRecruitmentStatus(@Query('status') status?: string) {
    return this.recruitmentStatusService.getRecruitmentStatus(status);
  }
}
