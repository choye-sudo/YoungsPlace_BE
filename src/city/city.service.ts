import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CityService {
    constructor(private prisma: PrismaService){}

    async getCities(city: string) {
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
