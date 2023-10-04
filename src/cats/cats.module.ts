import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { CatsRepository } from './repository/cats.repository';
import { REPOSITORY } from './constants';
import { CustomMiddleware } from './middleware/custom.middleware';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule],
  controllers: [CatsController],
  providers: [
    CatsService,
    {
      provide: REPOSITORY,
      useClass: CatsRepository,
    },
  ],
})
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CustomMiddleware).forRoutes(CatsController);
  }
}
