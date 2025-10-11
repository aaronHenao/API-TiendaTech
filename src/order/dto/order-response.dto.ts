import { Expose, Type } from 'class-transformer';
import { OrderStatus } from 'src/order/entities/order.entity';
import { OrderItemResponseDto } from './order-item-response.dto';

export class OrderResponseDto {
  @Expose()
  @Type(() => Number)
  id: number;

  @Expose()
  status: OrderStatus;

  @Expose()
  @Type(() => OrderItemResponseDto)
  items: OrderItemResponseDto[];
}