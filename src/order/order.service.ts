import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/database/entities/order.entity';
import { CreateOrderDTO } from 'src/dtos/Order/CreateOrderDTO';
import { GenericService } from 'src/generics/GenericService';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService extends GenericService<Order, CreateOrderDTO> {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {
    super(orderRepository);
  }
}
