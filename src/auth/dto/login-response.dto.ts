import { Rol } from "src/user/entities/user.entity";

export class LoginResponseDto{
    rol: Rol;
    email: string;
    access_token: string;

    constructor(accessToken, user){
        this.rol = user.rol;
        this.email = user.email;
        this.access_token = accessToken
    }
}