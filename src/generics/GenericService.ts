import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  Repository,
  DeepPartial,
  ObjectLiteral,
  FindOneOptions,
  FindOptionsWhere,
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
    try {
      const newEntity: T = this.repository.create(entity as DeepPartial<T>);
      return await this.repository.save(newEntity);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: number, entity: DeepPartial<T>): Promise<T | null> {
    const options: FindOptionsWhere<T> = { id } as any;
    const entityToUpdate: T | null = await this.repository.findOneBy(options);
    if (!entityToUpdate) {
      throw new InternalServerErrorException(`Entity with id ${id} not found`);
    }
    return await this.repository.save({
      ...entityToUpdate,
      ...entity,
    } as DeepPartial<T>);
  }

  async remove(id: number): Promise<void | string> {
    const options: FindOptionsWhere<T> = { id } as any;
    const entityToRemove: T | null = await this.repository.findOneBy(options);
    if (!entityToRemove) {
      throw new InternalServerErrorException(`Entity with id ${id} not found`);
    }
    await this.repository.remove(entityToRemove);
    return 'Removed';
  }
}
