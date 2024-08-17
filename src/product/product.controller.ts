import { Product } from 'src/database/entities/product.entity';
import { GenericController } from 'src/generics/GenericController';
import { ProductService } from './product.service';
import { Controller } from '@nestjs/common';
import { CreateProductDTO } from 'src/dtos/Product/CreateProductDTO';

@Controller('products')
export class ProductController extends GenericController<
  Product,
  CreateProductDTO
> {
  constructor(private readonly productService: ProductService) {
    super(productService);
  }
}
