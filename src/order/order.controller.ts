import { Order } from 'src/database/entities/order.entity';
import { GenericController } from 'src/generics/GenericController';
import { OrderService } from './order.service';
import { Controller } from '@nestjs/common';
import { CreateOrderDTO } from 'src/dtos/Order/CreateOrderDTO';

@Controller('orders')
export class OrderController extends GenericController<Order, CreateOrderDTO> {
  constructor(private readonly orderService: OrderService) {
    super(orderService);
  }
}
