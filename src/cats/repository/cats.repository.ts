import { Injectable } from '@nestjs/common';
import { Cat } from '../entities/cat.entity';
import { Repository } from './repository';

@Injectable()
export class CatsRepository implements Repository<Cat> {
  private cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  getAll() {
    return this.cats;
  }

  getOne(id: string) {
    return this.cats.find((cat) => id === cat.id);
  }

  update(id: string, toUpdate: Omit<Partial<Cat>, 'id'>) {
    this.cats = this.cats.map((cat) => {
      if (cat.id === id) {
        cat.color = toUpdate.color || cat.color;
        cat.name = toUpdate.name || cat.name;
      }
      return cat;
    });
  }

  delete(id: string) {
    this.cats.filter((cat) => cat.id !== id);
  }
}
