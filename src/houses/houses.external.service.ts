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

  async fetchLeaseNotices(): Promise<any> {
    const url = `${this.baseUrl}/lhLeaseNoticeInfo1?serviceKey=${this.apiKey}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
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

  async fetchPreLeaseNotices(): Promise<any> {
    const url = `${this.baseUrl}/lhLeaseNoticeBfhInfo1?serviceKey=${this.apiKey}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }

  async fetchRentalHousingList(): Promise<any> {
    const url = `${this.rentalBaseUrl}/rentalHouseList?serviceKey=${this.apiKey}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }
}