import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('HousesController (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // ✅ 전체 앱 모듈 로드
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/houses (GET) should return a list of houses', async () => {
    const response = await request(app.getHttpServer()).get('/houses').expect(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('/houses/:id (GET) should return a single house', async () => {
    const response = await request(app.getHttpServer()).get('/houses/1').expect(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('complex_name');
  });

  it('/houses (POST) should create a new house', async () => {
    const newHouse = { complex_name: '테스트 아파트', location: '서울' };

    const response = await request(app.getHttpServer())
      .post('/houses')
      .send(newHouse)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.complex_name).toBe('테스트 아파트');
  });

  it('/houses/:id (DELETE) should delete a house', async () => {
    await request(app.getHttpServer()).delete('/houses/1').expect(200);
  });
});