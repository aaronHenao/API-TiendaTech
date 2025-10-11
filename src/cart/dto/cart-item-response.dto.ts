import { Expose, Transform } from "class-transformer";

export class CartItemResponseDto{

    @Expose()
    productId: number;

    @Expose()
    quantity: number;
}