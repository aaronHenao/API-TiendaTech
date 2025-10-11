import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { GetUser } from 'src/common/decorators/get-user/get-user.decorator';
import { Rol, User } from 'src/user/entities/user.entity';
import { BaseApplicationResponse } from 'src/common/dto/base-application-response.dto';
import { AddCartItemResponseDto } from './dto/add-cart-item-response.dto';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { DeleteItemDto } from './dto/delete-item.dto';
import { DeleteItemResponseDto } from './dto/delete-item-reponse.dto';
import { CartItemResponseDto } from './dto/cart-item-response.dto';

@Controller('cart')
export class CartController {

    constructor(private cartService: CartService){}

    @Get()
    @Roles(Rol.CUSTOMER)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async getCartItems(@GetUser() user: User): Promise<BaseApplicationResponse<CartItemResponseDto[]>>{
        const items = await this.cartService.getCartItems(user.id);
        return{
            statusCode: 200, 
            message: 'Items obtenidos correctamente',
            data: items
        }
    }

    @Post()
    @Roles(Rol.CUSTOMER)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async addItem(@GetUser() user: User, @Body() item: AddCartItemDto ): Promise<BaseApplicationResponse<AddCartItemResponseDto>>{
        const newItem = await this.cartService.addItem(user.id, item);
        return{
            statusCode: 201,
            message: 'Item agregado correctamente',
            data: newItem
        }
    }


    @Patch()
    @Roles(Rol.CUSTOMER)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async updateItem(@GetUser() user: User, @Body() item: AddCartItemDto): Promise<BaseApplicationResponse<AddCartItemResponseDto>>{
        const updatedItem = await this.cartService.updateItem(user.id, item);
        return{
            statusCode: 202, 
            message: 'Cantidad del producto actualizada correctamente',
            data: updatedItem
        }
    }

    @Delete()
    @Roles(Rol.CUSTOMER)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async deleteItem(@GetUser() user: User, @Body() product: DeleteItemDto): Promise<BaseApplicationResponse<DeleteItemResponseDto>>{
        const deleteItem = await this.cartService.deleteItem(user.id, product.productId);
        return{
            statusCode: 202, 
            message:'Producto eliminado correctamente del carrito',
            data: deleteItem
        }
    }
}
