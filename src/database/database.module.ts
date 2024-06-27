import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmAsync from './database.config';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmAsync)],
})
export class DatabaseModule {}
