import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { HousesModule } from './houses/houses.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    HousesModule,
    RedisModule,
  ],
})
export class AppModule {}
