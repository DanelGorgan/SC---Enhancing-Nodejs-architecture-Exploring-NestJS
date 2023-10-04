import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../../auth/auth.module';
import { CatsController } from '../../cats/cats.controller';
import { CatsService } from '../../cats/cats.service';
import { CatsRepository } from '../../cats/repository/cats.repository';
import { REPOSITORY } from '../constants';
import { LoggerService } from '../../logger/logger.service';

describe('CatsService', () => {
  let catsService: CatsService;
  let loggerService: LoggerService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // since in unit tests we're not actually making a request, the auth guard is not actually being invoked
      imports: [AuthModule],
      controllers: [CatsController],
      providers: [
        // You can also mock the service and/or repository if needed
        CatsService,
        {
          provide: REPOSITORY,
          useClass: CatsRepository,
        },
        {
          provide: LoggerService,
          useValue: {
            customLog: jest.fn(),
            setContext: jest.fn(),
          },
        },
      ],
    }).compile();
    catsService = await module.resolve<CatsService>(CatsService);
    loggerService = module.get<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(catsService).toBeDefined();
  });

  it('should return cats', () => {
    const loggerSpy = jest.spyOn(loggerService, 'customLog');

    const mockCat = {
      name: 'Sisi',
      color: 'red',
    };
    catsService.create(mockCat);

    const cats = catsService.findAll();
    expect(cats).toHaveLength(1);
    expect(cats[0].id).toBeDefined();
    expect(cats[0].name).toBe(mockCat.name);
    expect(cats[0].color).toBe(mockCat.color);

    expect(loggerSpy).toBeCalledTimes(1);
  });
});
