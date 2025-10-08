import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateCategoryDto{
    @IsString()
    @IsNotEmpty({message: 'El nombre es obligatorio'})
    @MinLength(3, {message: 'El nombre debe tener al menos 3 caracteres '})
    name: string;
}