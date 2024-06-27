import { Injectable } from '@nestjs/common';
import {
  Repository,
  DeepPartial,
  ObjectLiteral,
  FindOneOptions,
} from 'typeorm';

@Injectable()
export class GenericService<T extends ObjectLiteral, RequestDTO> {
  constructor(private readonly repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<T | null> {
    const options: FindOneOptions<T> = {
      where: { id } as any,
    };
    return await this.repository.findOne(options);
  }

  async create(entity: RequestDTO): Promise<T> {
    return await this.repository.save(entity as any);
  }

  async update(id: number, entity: DeepPartial<T>): Promise<T | null> {
    const foundEntity = await this.repository.findOne(id as any);
    if (!foundEntity) {
      return null;
    }
    await this.repository.update(id, entity as any);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
