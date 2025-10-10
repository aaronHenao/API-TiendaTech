import { Expose } from "class-transformer";

export class AddCartItemResponseDto{
    @Expose()
    productId: number;

    @Expose()
    quantity: number;
}