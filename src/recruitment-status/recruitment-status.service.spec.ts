import { Test, TestingModule } from '@nestjs/testing';
import { RecruitmentStatusService } from './recruitment-status.service';

describe('RecruitmentStatusService', () => {
  let service: RecruitmentStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecruitmentStatusService],
    }).compile();

    service = module.get<RecruitmentStatusService>(RecruitmentStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
