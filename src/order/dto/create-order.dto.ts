import { IsArray, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateorderDto{

    @IsNotEmpty({message: 'El id del usuario es obligatorio'})
    @IsInt({message: 'El id debe ser numérico'})
    customerId: number;

    @IsArray()
    @IsString()
    status: string[];
}