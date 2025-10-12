import { IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateReviewDto{

    @IsNotEmpty({ message: 'El ID del producto es obligatorio.' })
    @IsInt({ message: 'El ID del producto debe ser un número entero.' })
    productId: number;

    @IsNotEmpty({message: 'El comentario es obligatorio'})
    @IsString({message: 'El comentario debe ser una cadena de texto.'})
    @MinLength(10, {message: 'El comentario debe tener al menos 10 caracteres'})
    comment: string;
    
}