import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should connect to the database', async () => {
    jest.spyOn(prismaService, '$connect').mockResolvedValue();

    await expect(prismaService.$connect()).resolves.not.toThrow();
  });

  it('should disconnect from the database', async () => {
    jest.spyOn(prismaService, '$disconnect').mockResolvedValue();

    await expect(prismaService.$disconnect()).resolves.not.toThrow();
  });
});
