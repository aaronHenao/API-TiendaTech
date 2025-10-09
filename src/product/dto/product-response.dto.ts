import { Expose, Type } from "class-transformer";
import { CategoryResponseDto } from "src/category/dto/category-response.dto";

export class ProductResponseDto {
    
    @Expose()
    name: string;

    @Expose()
    description: string;
    
    @Expose()
    @Type(() => Number)
    price: number; 

    @Expose()
    @Type(() => CategoryResponseDto)
    categories?: CategoryResponseDto[];

}