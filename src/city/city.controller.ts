import { Controller, Query, Get } from '@nestjs/common';
import { CityService } from './city.service';

@Controller('cities')
export class CityController {
    constructor (private readonly cityService: CityService){}

    @Get()
    async getCities(@Query('city') city: string){
        return this.cityService.getCities(city);
    }
}
