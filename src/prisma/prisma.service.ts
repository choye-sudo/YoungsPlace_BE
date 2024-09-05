import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();  // Prisma 클라이언트 연결
  }

  async onModuleDestroy() {
    await this.$disconnect();  // Prisma 클라이언트 연결 해제
  }
}
