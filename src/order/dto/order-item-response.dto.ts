import { Expose, Type } from 'class-transformer';

export class OrderItemResponseDto {
  @Expose()
  id: number;

  @Expose()
  productId: number;

  @Expose()
  quantity: number;

  @Expose()
  @Type(() => Number)
  price: number;
}