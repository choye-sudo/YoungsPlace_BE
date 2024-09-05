import { Test, TestingModule } from '@nestjs/testing';
import { RecruitmentStatusController } from './recruitment-status.controller';

describe('RecruitmentStatusController', () => {
  let controller: RecruitmentStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecruitmentStatusController],
    }).compile();

    controller = module.get<RecruitmentStatusController>(RecruitmentStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
