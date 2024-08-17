import { Photo } from 'src/database/entities/photo.entity';

export class CreateProductDTO {
  name: string;
  description: string;
  price: number;
  category: string;
  image: Photo;
}
