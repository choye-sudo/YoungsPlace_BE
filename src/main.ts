import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 글로벌 유효성 검사 파이프 적용
  app.useGlobalPipes(new ValidationPipe());

  // 서버 실행
  await app.listen(3000);
  console.log(`🚀 Server running on http://localhost:3000`);
}
bootstrap();
