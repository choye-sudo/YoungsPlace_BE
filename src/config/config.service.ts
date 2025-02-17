import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get apiKey(): string {
    return this.configService.get<string>('LH_API_KEY', '');
  }

  get apiBaseUrl(): string {
    return this.configService.get<string>('LH_API_BASE_URL', '');
  }
}
