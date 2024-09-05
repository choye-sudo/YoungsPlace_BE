import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CityService {
    constructor(private prisma: PrismaService){}

    async getCities(cityId: number) {
        return this.prisma.complexTypeInformation.findMany({
            include: {
                complex: {
                    select: {
                        city: true
                    },
                }
            }
        });
    }
}
