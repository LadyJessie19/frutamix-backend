import {
  Body,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  Controller,
} from '@nestjs/common';
import { GenericService } from './GenericService';
import { ObjectLiteral } from 'typeorm';

@Controller()
export class GenericController<T extends ObjectLiteral, RequestDTO> {
  constructor(private readonly service: GenericService<T, RequestDTO>) {}

  @Get()
  findAll(): Promise<T[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<T | null> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() entity: RequestDTO): Promise<T> {
    return this.service.create(entity);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() entity: T): Promise<T | null> {
    return this.service.update(id, entity);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.service.remove(id);
  }
}
