import { IsEmail, IsNotEmpty} from "class-validator";

export class LoginDto{

    @IsEmail({}, {message: 'Ingresa un correo válido'})
    @IsNotEmpty({message: 'El correo es obligatorio'})
    email:string;

    @IsNotEmpty({message: 'La contraseña es obligatoria'})
    password: string;
}