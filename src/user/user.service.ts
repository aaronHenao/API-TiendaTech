import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol, User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRespository: Repository<User>){}

    async getAll():Promise<UserResponseDto[]>{
        const users = await this.userRespository.find()

        if(!users || users.length === 0){
            throw new NotFoundException('No se encontraron usuarios');
        }
        return users.map(user => plainToInstance(UserResponseDto, user, {excludeExtraneousValues: true}))
    }

    async create(createUser: CreateUserDto): Promise<UserResponseDto>{
        const existingUser = await this.userRespository.findOneBy({email: createUser.email});

        if(existingUser){
            throw new BadRequestException('El correo ya está registrado en el sistema')
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(createUser.password, saltRounds);
        const newUser = this.userRespository.create({...createUser, password: hashedPassword, rol: Rol.CUSTOMER,});
        const savedUser = await this.userRespository.save(newUser);
        return plainToInstance(UserResponseDto, savedUser, {excludeExtraneousValues: true})
    }

    async createAdmin(createAdmin: CreateUserDto): Promise<UserResponseDto>{
        const existingEmail = await this.userRespository.findOneBy({email: createAdmin.email});

        if(existingEmail){
            throw new BadRequestException('El correo ya está registrado en el sistema como un cliente')
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(createAdmin.password, saltRounds);
        const newAdmin = this.userRespository.create({...createAdmin, password: hashedPassword, rol: Rol.ADMIN,});
        const savedAdmin = await this.userRespository.save(newAdmin);
        return plainToInstance(UserResponseDto, savedAdmin, {excludeExtraneousValues: true});
    }

    async findOneByEmail(email: string): Promise<UserResponseDto>{
        const user = await this.userRespository.findOneBy({email});
        return plainToInstance(User, {excludeExtraneousValues: true})
    }
}
