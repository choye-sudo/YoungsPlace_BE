import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SaveService {
  constructor(private prisma: PrismaService) {}

  // 단지명으로 ComplexInformation에서 데이터 조회
  async getComplexInfo(complexName: string) {
    const complex = await this.prisma.complexInformation.findUnique({
      where: { complex_name: complexName },
    });

    if (!complex) {
      throw new Error('해당 단지명이 존재하지 않습니다.');
    }

    // 단지명과 도로명주소 반환
    return {
      complex_name: complex.complex_name,
      address: complex.address,
    };
  }

  // 단지명과 도로명주소 리스트를 반환
  async getComplexList() {
    return this.prisma.complexInformation.findMany({
      select: {
        complex_name: true,
        address: true,
      },
    });
  }
}
