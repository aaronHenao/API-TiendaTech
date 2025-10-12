import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, Min} from "class-validator";

export class UpdateProductDto{

    @IsOptional()
    @IsNotEmpty({message: 'El producto debe tener un precio'})
    @IsPositive({message: 'El producto debe tener un precio mayor que cero '})
    @Type(() => Number)
    @IsNumber({maxDecimalPlaces: 2}, {message: 'El precio debe ser un número'})
    price?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: 'El stock debe ser un número entero' })
    @Min(0, { message: 'El stock no puede ser negativo' })
    stock?: number;
}