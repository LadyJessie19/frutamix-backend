import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/database/entities/product.entity';
import { CreateProductDTO } from 'src/dtos/Product/CreateProductDTO';
import { GenericService } from 'src/generics/GenericService';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService extends GenericService<Product, CreateProductDTO> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
    super(productRepository);
  }
}
