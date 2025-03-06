import { Test, TestingModule } from '@nestjs/testing';
import { RedisService } from './redis.service';

describe('RedisService', () => {
  let redisService: RedisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedisService],
    }).compile();

    redisService = module.get<RedisService>(RedisService);
  });

  it('should store and retrieve a value', async () => {
    jest.spyOn(redisService, 'set').mockResolvedValue();
    jest.spyOn(redisService, 'get').mockResolvedValue('test-value');

    await redisService.set('test-key', 'test-value', 10);
    const value = await redisService.get('test-key');

    expect(value).toBe('test-value');
  });

  it('should delete a key', async () => {
    jest.spyOn(redisService, 'del').mockResolvedValue();

    await redisService.set('test-key', 'test-value', 10);
    await redisService.del('test-key');
    const value = await redisService.get('test-key');

    expect(value).toBeNull();
  });
});
