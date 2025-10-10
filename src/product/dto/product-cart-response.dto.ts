import { Expose, Type } from "class-transformer";

export class ProductCartResponseDto {
    @Expose()
    id: number;

    @Expose()
    @Type(() => Number)
    stock: number; 
    
    @Expose()
    name: string;
    
    @Expose()
    @Type(() => Number)
    price: number; 
}
