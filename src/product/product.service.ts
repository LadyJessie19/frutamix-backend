import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/database/entities/category.entity';
import { Product } from 'src/database/entities/product.entity';
import { CreateProductDTO } from 'src/dtos/Product/CreateProductDTO';
import { GenericService } from 'src/generics/GenericService';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService extends GenericService<Product, CreateProductDTO> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {
    super(productRepository);
  }

  async createProduct(createProductDTO: CreateProductDTO) {
    try {
      const foundCategory = await this.categoryRepository.findOne({
        id: createProductDTO.category,
      } as any);

      if (!foundCategory || foundCategory === null) {
        throw new HttpException('Category not found', 404);
      }

      createProductDTO.category = foundCategory;

      const product = this.productRepository.create(createProductDTO as any);
      await this.productRepository.save(product);

      return product;
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || 500,
      );
    }
  }
}
