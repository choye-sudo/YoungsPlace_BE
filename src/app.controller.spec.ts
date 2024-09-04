import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { ApiService } from './service/api.service';

describe('AppController', () => {
  let appController: AppController;
  let apiService: ApiService;

  beforeEach(async () => {
    const csvServiceMock = {
      loadCsvData: jest.fn().mockResolvedValue('CSV data loaded successfully'),
    };

    const apiServiceMock = {
      updateComplexInformation: jest.fn().mockResolvedValue('Data updated successfully from API'),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        { provide: ApiService, useValue: apiServiceMock },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    apiService = app.get<ApiService>(ApiService);
  });

  describe('updateData', () => {
    it('should return success message when data is updated successfully', async () => {
      const result = await appController.updateData();
      expect(result).toBe('Data updated successfully from API');
      expect(apiService.updateComplexInformation).toHaveBeenCalled();
    });

    it('should return error message when data update fails', async () => {
      jest.spyOn(apiService, 'updateComplexInformation').mockRejectedValueOnce(new Error('Failed to update data'));
      const result = await appController.updateData();
      expect(result).toBe('Error updating data from API: Failed to update data');
    });
  });
});
