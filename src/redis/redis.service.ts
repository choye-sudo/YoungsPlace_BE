import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class RedisService {
  private client;

  constructor() {
    this.client = createClient({ url: 'redis://localhost:6379' });

    this.client.on('error', (err) => console.error('Redis Client Error', err));
    this.client.connect();
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string, ttl: number = 600): Promise<void> {
    await this.client.set(key, value, 'EX', ttl);
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }
}
