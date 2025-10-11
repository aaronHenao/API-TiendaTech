import { IsInt, IsNotEmpty } from "class-validator";

export class DeleteItemDto{

    @IsInt({ message: 'El ID del producto debe ser un número entero.' })
    @IsNotEmpty({ message: 'El ID del producto es obligatorio.' })
    productId: number;
}