export interface Repository<T> {
  create(entity: Partial<T>): void;
  getAll(): T[];
  getOne(id: string): T;
  update(id: string, entity: Partial<T>): void;
  delete(id: string): void;
}
