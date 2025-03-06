import { Test, TestingModule } from '@nestjs/testing';
import { HousesService } from './houses.service';
import { HousesRepository } from './houses.repository';

describe('HousesService', () => {
  let housesService: HousesService;
  let housesRepository: Partial<HousesRepository>;

  beforeEach(async () => {
    housesRepository = {
      getAllHouses: jest.fn().mockResolvedValue([{ id: '1', complex_name: '테스트 아파트' }]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HousesService,
        { provide: HousesRepository, useValue: housesRepository },
      ],
    }).compile();

    housesService = module.get<HousesService>(HousesService);
  });

  it('should return a list of houses', async () => {
    const result = await housesService.getAllHouses();
    expect(result).toEqual([{ id: '1', complex_name: '테스트 아파트' }]);
  });
});
