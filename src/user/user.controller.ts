import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BaseApplicationResponse } from 'src/common/dto/base-application-response.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post('register')
    async create(@Body() newUser: CreateUserDto): Promise<BaseApplicationResponse<UserResponseDto>>{
        const user = await this.userService.create(newUser);
        return{
            statusCode: 201, 
            message: 'Usuario creado correctamente',
            data: user
        }
    }

    //Este endpoint es temporal. Bórralo o coméntalo después de crear el primer admin
    @Post('create-first-admin')
    async createFirstAdmin(@Body() admin: CreateUserDto): Promise<BaseApplicationResponse<UserResponseDto>>{
        const dataAdmin = await this.userService.createAdmin(admin);
        return{
            statusCode: 201, 
            message: 'Administrador creado correctamente',
            data: dataAdmin
        }
    }

    //Despues de crear el primer admin, usa este endpoint protegido
    @Post('admin')
    async createNewAdmin(@Body() newAdmin: CreateUserDto): Promise<BaseApplicationResponse<UserResponseDto>>{
        const admin = await this.userService.createAdmin(newAdmin);
        return{
            statusCode: 201, 
            message: 'Administrador creado correctamente',
            data: admin
        }
    }
}
