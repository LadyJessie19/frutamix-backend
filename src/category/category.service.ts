import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/database/entities/category.entity';
import { CreateCategoryDTO } from 'src/dtos/Category/CreateCategoryDTO';
import { GenericService } from 'src/generics/GenericService';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService extends GenericService<
  Category,
  CreateCategoryDTO
> {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {
    super(categoryRepository);
  }
}
