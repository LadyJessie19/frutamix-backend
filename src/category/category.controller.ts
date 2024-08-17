import { Category } from 'src/database/entities/category.entity';
import { GenericController } from 'src/generics/GenericController';
import { CategoryService } from './category.service';
import { Controller } from '@nestjs/common';
import { CreateCategoryDTO } from 'src/dtos/Category/CreateCategoryDTO';

@Controller('categories')
export class CategoryController extends GenericController<
  Category,
  CreateCategoryDTO
> {
  constructor(private readonly categoryService: CategoryService) {
    super(categoryService);
  }
}
