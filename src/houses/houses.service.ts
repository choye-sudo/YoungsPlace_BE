import { Injectable } from '@nestjs/common';
import { HousesRepository } from './houses.repository';
import { HousesExternalService } from './houses.external.service';
import { FilterHousesDto } from './dto/filter-houses.dto';
import { SearchHousesDto } from './dto/search-houses.dto';
import { CreateWishDto } from './dto/create-wish.dto';

@Injectable()
export class HousesService {
  constructor(
    private readonly housesRepository: HousesRepository,
    private readonly housesExternalService: HousesExternalService,
  ) {}

  // 🔄 외부 API 데이터를 가져와 DB에 저장
  async syncHouses() {
    console.log('🔄 외부 API에서 공고 데이터를 가져와 DB에 저장합니다...');
    const leaseNotices = await this.housesExternalService.fetchCompleteLeaseNotices();

    for (const notice of leaseNotices) {
      const houseData = {
        id: notice.PAN_ID,
        leaseType: notice.UPP_AIS_TP_NM,
        location: notice.CNP_CD_NM,
        address: notice.LGDN_DTL_ADR || '-',
        complexName: notice.BZDT_NM,
        totalUnits: notice.TOT_HSH_CNT,
        landlord: notice.insttNm,
        completionDate: notice.competDe,
        buildingType: notice.buldStleNm,
        heatingType: notice.heatMthdDetailNm,
        elevator: notice.elvtrInstlAtNm === '설치', // Boolean 변환
        parkingSpaces: notice.parkngCo,
        housingInfo: notice.houseTyNm,
        status: notice.PAN_SS,
        applicationUrl: notice.DTL_URL,
        details: notice.details, // 상세정보 추가
        supplyInfo: notice.supplyInfo, // 공급정보 추가
      };

      // ✅ 중복 방지: 기존 데이터가 있는 경우 업데이트만 수행
      const existingHouse = await this.housesRepository.findHouseById(houseData.id);

      if (!existingHouse) {
        await this.housesRepository.createHouse(houseData);
      } else if (JSON.stringify(existingHouse) !== JSON.stringify(houseData)) {
        await this.housesRepository.updateHouse(houseData.id, houseData);
      }
    }

    console.log('✅ DB 저장 완료!');
  }

  // ✅ 전체 청약 주택 목록 조회
  async getAllHouses() {
    return this.housesRepository.findAll({});
  }

  // ✅ 특정 ID로 청약 주택 조회
  async getHouseById(id: string) {
    return this.housesRepository.findById(id);
  }

  // ✅ 필터링 (location, status 등)
  async filterHouses(filterDto: FilterHousesDto) {
    return this.housesRepository.findAll(filterDto);
  }

  // ✅ 키워드 기반 청약 주택 검색
  async searchHouses(searchDto: SearchHousesDto) {
    return this.housesRepository.searchHouses(searchDto.keyword);
  }

  // ✅ 찜 목록 조회 (localStorage 활용)
  async getWishList() {
    return []; // Redis를 활용할 수도 있음 (향후 확장 가능)
  }

  // ✅ 찜하기 추가
  async addWish(createWishDto: CreateWishDto) {
    return { message: `House ${createWishDto.houseId} added to wish list` };
  }

  // ✅ 찜하기 삭제
  async removeWish(id: string) {
    return { message: `House ${id} removed from wish list` };
  }
}
