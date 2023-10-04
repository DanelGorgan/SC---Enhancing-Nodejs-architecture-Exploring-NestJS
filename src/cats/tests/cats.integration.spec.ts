import { Test, TestingModule } from '@nestjs/testing';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from '../../app.module';
import { JwtService } from '@nestjs/jwt';
import { VersioningType } from '@nestjs/common';

describe('Cats endpoint (e2e)', () => {
  let app: NestFastifyApplication;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    jwt = moduleFixture.get<JwtService>(JwtService);

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    app.enableVersioning({ type: VersioningType.URI });

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/GET cats', () => {
    it(`throw validation error`, async () => {
      await app
        .inject({
          method: 'GET',
          url: '/v1/cats',
        })
        .then(({ payload }) => {
          expect(JSON.parse(payload)).toEqual({
            message: 'Unauthorized',
            statusCode: 401,
          });
        });
    });

    it(`return cats`, async () => {
      const payload = { sub: 'test', username: 'test' };
      const token = await jwt.signAsync(payload);
      await app
        .inject({
          method: 'GET',
          url: '/v1/cats',
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then(({ payload }) => {
          expect(JSON.parse(payload)).toEqual([]);
        });
    });
  });
});
