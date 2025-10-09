import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Min, MinLength } from "class-validator";

export class updateProductDto{
    @IsOptional()
    @IsString({message: 'La descripción debe ser una cadena de texto.'})
    @MinLength(8, {message: 'La descripción debe tener al menos 8 caracteres'})
    description: string;

    @Type(() => Number)
    @IsInt({ message: 'El stock debe ser un número entero' })
    @Min(0, { message: 'El stock no puede ser negativo' })
    @IsOptional()
    stock: number;
}