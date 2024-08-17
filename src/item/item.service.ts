import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/database/entities/item.entity';
import { CreateItemDTO } from 'src/dtos/Item/CreateItemDTO';
import { GenericService } from 'src/generics/GenericService';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService extends GenericService<Item, CreateItemDTO> {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {
    super(itemRepository);
  }
}
