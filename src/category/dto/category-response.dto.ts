import { Expose, Type } from "class-transformer";

export class CategoryResponseDto{
    
    @Expose()
    @Type(() => Number)
    id: number;

    @Expose()
    name:string;
}