import { Category } from 'src/database/entities/category.entity';
import { Photo } from 'src/database/entities/photo.entity';

export class CreateProductDTO {
  name: string;
  description: string;
  price: number;
  category: number | Category;
  image?: Photo;
}
