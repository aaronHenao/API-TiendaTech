import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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

    async addItem(userId: number, item: AddCartItemDto): Promise<AddCartItemResponseDto>{
        const cart = await this.createOrFindCart(userId);
        await this.productService.getById(item.productId);
        const existingItem = await this.cartItemRepository.findOne({where: {productId: item.productId}})

        if(existingItem){
            throw new ConflictException(`El producto con id ${item.productId} ya está en el carrito. Actualízalo!`)
        }
        
        const newItem = this.cartItemRepository.create({cartId: cart.id, ...item});
        
        await this.cartItemRepository.save(newItem);
        return plainToInstance(AddCartItemResponseDto, newItem)
    }


    private async getCartId(userId: number){
        const cart = await this.cartRepository.findOneBy({customerId: userId});
        if(cart){
            return cart.id;
        } else {
            return null;
        }
    }

    async updateItem(userId: number, item: AddCartItemDto): Promise<AddCartItemResponseDto>{
        const existingCart = await this.getCartId(userId);

        if(!existingCart){
            throw new NotFoundException('No tienes un carrito creado')
        }
        
        let newItem = await this.cartItemRepository.findOne({where: {productId: item.productId}})

        if(!newItem){
            throw new NotFoundException(`El producto con id ${item.productId} no está agregado a tu carrito, agrégalo primero`)
        }

        newItem.quantity = item.quantity;
        await this.cartItemRepository.save(newItem);
        
        return plainToInstance(AddCartItemResponseDto, newItem)
    }

    async deleteItem(userId: number, productId: number): Promise<DeleteItemResponseDto>{
        const existingCart = await this.getCartId(userId);

        if (!existingCart) {
            throw new NotFoundException('No tienes un carrito creado');
        }

        const existingItem = await this.cartItemRepository.findOne({ where: { productId } });

        if (!existingItem) {
            throw new NotFoundException(`El producto con id ${productId} no está en tu carrito`);
        }

        await this.cartItemRepository.remove(existingItem);

        return plainToInstance(DeleteItemResponseDto, existingItem);
    }

}
