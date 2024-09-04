import { Controller, Get } from '@nestjs/common';
import { ApiService } from './service/api.service';

@Controller()
export class AppController {
  constructor(private readonly apiService: ApiService) {}

  @Get('/fetch-initial-data')
  async fetchInitialData() {
    try {
      // 2024년 1월 1일부터 현재까지의 데이터를 가져옵니다.
      const startDate = '20240101';
      const endDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      await this.apiService.fetchAllData(startDate, endDate);
      return 'Initial data fetched successfully';
    } catch (error) {
      return `Error fetching initial data: ${error.message}`;
    }
  }
}
