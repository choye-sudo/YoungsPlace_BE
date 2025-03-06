import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AppConfigService } from '../config/config.service';

@Injectable()
export class HousesExternalService {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly rentalBaseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly appConfigService: AppConfigService
  ) {
    this.apiKey = this.appConfigService.apiKey;
    this.baseUrl = this.appConfigService.apiBaseUrl;
    this.rentalBaseUrl = this.appConfigService.apiBaseUrl;
  }

  // 전체 공고 목록을 조회하고, 각 공고별 상세정보 및 공급정보를 포함한 데이터를 반환
  async fetchCompleteLeaseNotices(): Promise<any[]> {
    let allNotices = [];
    let page = 1;
    const pageSize = 100;
    let totalPages = Number.MAX_SAFE_INTEGER;

    while (page <= totalPages) {
      const url = `${this.baseUrl}/lhLeaseNoticeInfo1?serviceKey=${this.apiKey}&PG_SZ=${pageSize}&PAGE=${page}&PAN_NT_ST_DT=20240101&PAN_NT_ED_DT=20241231`;
      const response = await firstValueFrom(this.httpService.get(url));

      if (!response.data || response.data.length === 0) {
        break;
      }

      allNotices.push(...response.data);

      if (response.data.totalPages) {
        totalPages = response.data.totalPages;
      }

      page++;
    }

    // 🔹 각 공고에 대한 상세정보 및 공급정보를 추가적으로 가져옴
    for (const notice of allNotices) {
      const panId = notice.PAN_ID;

      // 상세정보 조회
      const details = await this.fetchDetailedInformation(panId);
      // 공급정보 조회
      const supplyInfo = await this.fetchSupplyInformation(panId);

      // 🔹 기존 공고 데이터에 상세정보 및 공급정보 추가
      notice.details = details;
      notice.supplyInfo = supplyInfo;
    }

    return allNotices;
  }

  async fetchDetailedInformation(panId: string): Promise<any> {
    const url = `${this.baseUrl}/lhLeaseNoticeDtlInfo1?serviceKey=${this.apiKey}&PAN_ID=${panId}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }

  async fetchSupplyInformation(panId: string): Promise<any> {
    const url = `${this.baseUrl}/lhLeaseNoticeSplInfo1?serviceKey=${this.apiKey}&PAN_ID=${panId}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }
}