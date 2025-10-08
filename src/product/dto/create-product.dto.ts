import { Type } from "class-transformer";
import { IsArray, IsDecimal, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateProductDto{
    @IsString({message: 'El nombre debe ser una cadena de texto.'})
    @IsNotEmpty({message: 'El nombre es obligatorio'})
    @MinLength(4, {message: 'El nombre debe tener al menos 4 caracteres'})
    name: string;
    
    
    @IsOptional()
    @IsString({message: 'La descripción debe ser una cadena de texto.'})
    @MinLength(8, {message: 'La descripción debe tener al menos 8 caracteres'})
    description?: string;
    

    @IsNotEmpty({message: 'El producto debe tener un precio'})
    @IsPositive({message: 'El producto debe tener un precio mayor que cero '})
    @Type(() => Number)
    @IsNumber({maxDecimalPlaces: 2}, {message: 'El precio debe ser un número'})
    price: number;

    @Type(() => Number)
    @IsInt({ message: 'El stock debe ser un número entero' })
    @Min(0, { message: 'El stock no puede ser negativo' })
    stock: number;

    @IsArray()
    @IsInt({ each: true })
    @IsOptional()
    @Type(() => Number)
    categoryIds?: number[];

}