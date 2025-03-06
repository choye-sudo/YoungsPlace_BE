import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HousesRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ✅ 특정 공고 ID(PAN_ID)로 데이터 조회 (중복 확인용)
  async findHouseById(id: string) {
    return this.prisma.house.findUnique({ where: { id } });
  }

  // ✅ 새로운 공고 데이터를 저장
  async createHouse(houseData: any) {
    return this.prisma.house.create({
      data: {
        ...houseData,
        details: JSON.stringify(houseData.details),
        supplyInfo: JSON.stringify(houseData.supplyInfo),
      },
    });
  }

  // ✅ 기존 공고 데이터를 업데이트
  async updateHouse(id: string, houseData: any) {
    return this.prisma.house.update({
      where: { id },
      data: {
        ...houseData,
        details: JSON.stringify(houseData.details),
        supplyInfo: JSON.stringify(houseData.supplyInfo),
      },
    });
  }

  // ✅ `upsert()`를 사용하여 중복 방지 및 자동 업데이트
  async createOrUpdateHouse(houseData: any) {
    return this.prisma.house.upsert({
      where: { id: houseData.id },
      update: {
        ...houseData,
        details: JSON.stringify(houseData.details),
        supplyInfo: JSON.stringify(houseData.supplyInfo),
      },
      create: {
        ...houseData,
        details: JSON.stringify(houseData.details),
        supplyInfo: JSON.stringify(houseData.supplyInfo),
      },
    });
  }

  // ✅ 전체 공고 목록 조회 (필터링 옵션 추가)
  async findAll(filter?: any) {
    return this.prisma.house.findMany({
      where: filter,
      orderBy: { completionDate: 'desc' },
    });
  }

  // ✅ 특정 ID로 청약 주택 조회
  async findById(id: string) {
    return this.prisma.house.findUnique({ where: { id } });
  }

  // ✅ 키워드 기반 검색
  async searchHouses(keyword: string) {
    return this.prisma.house.findMany({
      where: {
        OR: [
          { complexName: { contains: keyword, mode: 'insensitive' } },
          { address: { contains: keyword, mode: 'insensitive' } },
        ],
      },
    });
  }
}
