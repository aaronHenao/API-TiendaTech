import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService){}

    async validateUser(loginDto: LoginDto): Promise<any>{
        const user = await this.userService.findOneByEmail(loginDto.email);

        if(user && await bcrypt.compare(loginDto.password, user.password)){
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(loginDto: LoginDto): Promise<LoginResponseDto>{
        const validatedUser = await this.validateUser(loginDto);
        if(!validatedUser){
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const payload = {
            sub: validatedUser.id,
            email: validatedUser.email,
            rol: validatedUser.rol
        };

    
        const access_token =  this.jwtService.sign(payload);
        return new LoginResponseDto(access_token, loginDto)
    }

}
