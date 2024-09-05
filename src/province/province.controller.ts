import { Controller, Query, Get } from '@nestjs/common';
import { ProvinceService } from './province.service';

@Controller('provinces')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Get()
    async getProvinces(@Query('province') province: string){
        return this.provinceService.getProvinces(province);
    }
}
