import { Expose, Type } from "class-transformer";

export class DeleteItemResponseDto{
    @Type(()=> Number)
    @Expose()
    productId: number;
    
}