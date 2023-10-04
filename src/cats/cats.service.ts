import { Inject, Injectable, Logger } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { randomUUID } from 'crypto';
import { REPOSITORY } from './constants';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { Repository } from './repository/repository';

@Injectable()
export class CatsService {
  // the common way of using logger, each per service in order to be able to set the context
  private logger = new Logger('CatsService');
  // BAD
  // private catsRepository: CatsRepository = new CatsRepository()
  // GOOD - IOC
  // constructor(private catsRepository: CatsRepository) {}
  //BETTER - IOC with dependency inversion
  constructor(
    @Inject(REPOSITORY) private repository: Repository<Cat>,
    private customLogger: LoggerService,
  ) {
    this.logger.debug('Initializing catService');

    // alternative for creating a logger where it can be extended using your favorite logger
    // TRANSIENT scope is important in order to have unique contexts for each provider
    this.customLogger.setContext('CatsService');
    this.customLogger.customLog();
  }

  create(createCatDto: CreateCatDto) {
    return this.repository.create({ id: randomUUID(), ...createCatDto });
  }

  findAll() {
    return this.repository.getAll();
  }

  findOne(id: string) {
    return this.repository.getOne(id);
  }

  update(id: string, updateCatDto: UpdateCatDto) {
    return this.repository.update(id, updateCatDto);
  }

  remove(id: string) {
    return this.repository.delete(id);
  }
}
