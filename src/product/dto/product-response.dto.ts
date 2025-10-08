// product-response.dto.ts
import { Expose, Type } from "class-transformer";
import { CategoryResponseDto } from "src/category/dto/category-response.dto";

export class ProductResponseDto {
    @Expose()
    id: number;
    
    @Expose()
    name: string;

    @Expose()
    description: string;
    
    @Expose()
    @Type(() => Number)
    price: number; 

    @Expose()
    stock: number;
    
    @Expose()
    @Type(() => CategoryResponseDto) 
    categories?: CategoryResponseDto[]; 

}