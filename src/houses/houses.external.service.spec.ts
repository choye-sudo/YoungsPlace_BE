import { Test, TestingModule } from '@nestjs/testing';
import { HousesExternalService } from './houses.external.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('HousesExternalService', () => {
  let housesExternalService: HousesExternalService;
  let httpService: Partial<HttpService>;

  beforeEach(async () => {
    httpService = {
      get: jest.fn().mockReturnValue(of({ data: [{ id: '1', name: '외부 API 테스트 아파트' }] })),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HousesExternalService,
        { provide: HttpService, useValue: httpService },
      ],
    }).compile();

    housesExternalService = module.get<HousesExternalService>(HousesExternalService);
  });

  it('should fetch lease notices from external API', async () => {
    const result = await housesExternalService.fetchLeaseNotices();
    expect(result).toEqual([{ id: '1', name: '외부 API 테스트 아파트' }]);
  });
});
