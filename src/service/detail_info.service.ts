// detail_info.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class DetailInfoService {
  constructor(private prisma: PrismaService) {}

  async getComplexInformation(complexName: string) {
    console.log('Attempting to fetch complex information for:', complexName);
    try {
      const result = await this.prisma.complexInformation.findUnique({
        where: { complex_name: complexName },
      });
      console.log('Result:', result);
      return result;
    } catch (error) {
      console.error('Error fetching complex information:', error);
    }
  }

  async getComplexTypeInformation(complexName: string) {
    console.log('Attempting to fetch complex type information for:', complexName);
    try {
      const result = await this.prisma.complexTypeInformation.findMany({
        where: { complex_name: complexName },
      });
      console.log('Result:', result);
      return result;
    } catch (error) {
      console.error('Error fetching complex type information:', error);
    }
  }

  async getSubscriptionInformation(complexName: string) {
    console.log('Attempting to fetch subscription information for:', complexName);
    try {
      const result = await this.prisma.subscriptionInformation.findMany({
        where: { complex_name: complexName },
      });
      console.log('Result:', result);
      return result;
    } catch (error) {
      console.error('Error fetching subscription information:', error);
    }
  }
}
