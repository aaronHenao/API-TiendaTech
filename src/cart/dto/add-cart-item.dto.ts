import { IsInt, IsNotEmpty, Min } from "class-validator";

export class AddCartItemDto{
    @IsInt({ message: 'El ID del producto debe ser un número entero.' })
    @IsNotEmpty({ message: 'El ID del producto es obligatorio.' })
    productId: number;

    @IsInt({ message: 'La cantidad debe ser un número entero.' })
    @Min(1, { message: 'La cantidad debe ser al menos 1.' })
    quantity: number;
}