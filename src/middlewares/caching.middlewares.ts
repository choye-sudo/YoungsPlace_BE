import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class CachingMiddleware implements NestMiddleware {
  constructor(private readonly redisService: RedisService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const cacheKey = req.originalUrl;
    const cachedData = await this.redisService.get(cacheKey);

    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    const originalSend = res.send;
    res.send = (body) => {
      this.redisService.set(cacheKey, JSON.stringify(body), 60 * 10); // 10분 캐싱
      return originalSend.call(res, body);
    };

    next();
  }
}
