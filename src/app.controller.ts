import { Controller, Get } from '@nestjs/common';
import { ApiService } from './service/api.service';

@Controller()
export class AppController {
  constructor(
    private readonly apiService: ApiService,
  ) {}

  @Get('/update-data')
  async updateData() {
    try {
      await this.apiService.updateComplexInformation();
      return 'Data updated successfully from API';
    } catch (error) {
      return `Error updating data from API: ${error.message}`;
    }
  }
}

