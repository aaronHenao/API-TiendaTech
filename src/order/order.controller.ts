import { Controller, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { GetUser } from 'src/common/decorators/get-user/get-user.decorator';
import { Rol, User } from 'src/user/entities/user.entity';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';
import { BaseApplicationResponse } from 'src/common/dto/base-application-response.dto';
import { OrderResponseDto } from './dto/order-response.dto';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService){}

    @Post()
    @Roles(Rol.CUSTOMER)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async createOrder(@GetUser() user: User): Promise<BaseApplicationResponse<OrderResponseDto>>{
        const order = await this.orderService.createorder(user.id);
        return{
            statusCode: 201,
            message: 'Orden creada y procesada correctamente',
            data: order
        }
    }
}
