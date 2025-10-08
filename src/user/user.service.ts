import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol, User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import * as bcrypt from 'bcrypt';
import { plainToClass, plainToInstance } from 'class-transformer';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRespository: Repository<User>){}

    async create(createUser: CreateUserDto): Promise<UserResponseDto>{
        const existingUser = await this.userRespository.findOneBy({email: createUser.email});

        if(existingUser){
            throw new BadRequestException('El correo ya está registrado en el sistema')
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(createUser.password, saltRounds);
        const newUser = this.userRespository.create({...createUser, password: hashedPassword, rol: Rol.CUSTOMER,});
        const savedUser = await this.userRespository.save(newUser);
        return plainToInstance(UserResponseDto, savedUser);
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
        return plainToInstance(UserResponseDto, savedAdmin);;
    }

    async findOneByEmail(email: string): Promise<User | null>{
        return this.userRespository.findOneBy({email})
    }
}
