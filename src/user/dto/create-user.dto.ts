import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto{
    
    @IsString()
    @IsNotEmpty({message: 'El nombre es obligatorio'})
    @MinLength(3, {message: 'El nombre debe tener al menos 3 caracteres '})
    name: string;
    
    @IsEmail({}, {message: 'El correo debe ser una dirección válida.'})
    @IsNotEmpty({message: 'El correo es obligatorio'})
    email: string;
    
    @IsNotEmpty({message: 'La contraseña es obligatoria'})
    @MinLength(8, {message: 'La contraseña debe tener al menos 8 caracteres'})
    password: string;
}