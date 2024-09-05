import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProvinceService {
  constructor(private prisma: PrismaService) {}

  async getProvinces(province?: string) {
    return this.prisma.complexTypeInformation.findMany({
      where: {
        complex: {
          province: province ? { equals: province } : undefined,  // province로 필터링
        },
      },
      include: {
        complex: {
          select: {
            province: true,  // province 필드만 선택
          },
        },
      },
    });
  }
}
