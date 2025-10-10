import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart-item.entity';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { AddCartItemResponseDto } from './dto/add-cart-item-response.dto';
import { ProductService } from 'src/product/product.service';
import { plainToInstance } from 'class-transformer';
import { DeleteItemResponseDto } from './dto/delete-item-response.dto';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart) private cartRepository: Repository<Cart>,
        @InjectRepository(CartItem) private cartItemRepository: Repository<CartItem>,
        private readonly productService: ProductService
    ){}

    private async createOrFindCart(id: number): Promise<Cart>{
        let cart = await this.cartRepository.findOne({where: {customerId: id}, relations: ['items']})

        if(!cart){
            cart = this.cartRepository.create({customerId: id});
            await this.cartRepository.save(cart);
            cart.items = [];

        }

        return cart;
    }

    async addOrUpdateItem(userId: number, item: AddCartItemDto): Promise<AddCartItemResponseDto>{
        const cart = await this.createOrFindCart(userId);
        const product = await this.productService.getById(item.productId);
        let newItem = await this.cartItemRepository.findOne({where: {productId: item.productId}})

        if(!newItem){
            newItem = this.cartItemRepository.create({cartId: cart.id, ...item});
        } else{
            newItem.quantity += item.quantity;
        }
        await this.cartItemRepository.save(newItem);
        return plainToInstance(AddCartItemResponseDto, newItem)
    }

}
