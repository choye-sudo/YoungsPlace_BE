import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FilterHousesDto } from './dto/filter-houses.dto';

@Injectable()
export class HousesRepository {
  constructor(private readonly prisma: PrismaService) {}

  // 주택 정보 생성 또는 업데이트 (Upsert)
  async createOrUpdateHouse(houseData: any) {
    return this.prisma.house.upsert({
      where: { id: houseData.id },
      update: { ...houseData },
      create: { ...houseData },
    });
  }

  // 전체 주택 조회 (필터 적용)
  async findAll(filterDto: FilterHousesDto) {
    const { location, status } = filterDto;
    
    return this.prisma.house.findMany({
      where: {
        ...(location && { location }),
        ...(status && { status }),
      },
    });
  }

  // 특정 ID로 주택 조회
  async findById(id: string) {
    return this.prisma.house.findUnique({ where: { id } });
  }

  // 키워드 기반 주택 검색
  async searchHouses(keyword: string) {
    return this.prisma.house.findMany({
      where: {
        OR: [
          { complexName: { contains: keyword, mode: 'insensitive' } },
          { location: { contains: keyword, mode: 'insensitive' } },
        ],
      },
    });
  }
}
