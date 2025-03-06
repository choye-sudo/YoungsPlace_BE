import { Test, TestingModule } from '@nestjs/testing';
import { HousesController } from './houses.controller';
import { HousesService } from './houses.service';

describe('HousesController', () => {
  let housesController: HousesController;
  let housesService: Partial<HousesService>;

  beforeEach(async () => {
    housesService = {
      getAllHouses: jest.fn().mockResolvedValue([{ id: '1', complex_name: '테스트 아파트' }]),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HousesController],
      providers: [{ provide: HousesService, useValue: housesService }],
    }).compile();

    housesController = module.get<HousesController>(HousesController);
  });

  it('should return a list of houses', async () => {
    const result = await housesController.getAllHouses();
    expect(result).toEqual([{ id: '1', complex_name: '테스트 아파트' }]);
  });
});
