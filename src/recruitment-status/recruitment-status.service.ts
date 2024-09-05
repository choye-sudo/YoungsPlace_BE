import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RecruitmentStatusService {
  constructor(private prisma: PrismaService) {}

  // 주어진 상태에 따라 필터링하고, 상태가 없으면 전체 데이터를 반환
  async getRecruitmentStatus(status?: string) {
    return this.prisma.subscriptionInformation.findMany({
      where: status ? { recruitment_status: status } : {},  // 상태가 없으면 전체
    });
  }
}
