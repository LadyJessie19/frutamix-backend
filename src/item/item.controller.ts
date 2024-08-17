import { Item } from 'src/database/entities/item.entity';
import { GenericController } from 'src/generics/GenericController';
import { ItemService } from './item.service';
import { Controller } from '@nestjs/common';
import { CreateItemDTO } from 'src/dtos/Item/CreateItemDTO';

@Controller('items')
export class ItemController extends GenericController<Item, CreateItemDTO> {
  constructor(private readonly itemService: ItemService) {
    super(itemService);
  }
}
