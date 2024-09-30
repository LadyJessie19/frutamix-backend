import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

// Essa droga está quebrada!

describe('ProductService', () => {
  let productService: ProductService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    productService = app.get<ProductService>(ProductService);
  });

  describe('products', () => {
    it('should create a new product', () => {
      const product = productService.create({
        name: 'Product 1',
        description: 'Description 1',
        price: 100,
        category: 1,
      });

      const category = {
        id: 1,
        name: 'Category 1',
        description: 'Description 1',
      };

      expect(product).toHaveProperty('id');
    });
  });
});
