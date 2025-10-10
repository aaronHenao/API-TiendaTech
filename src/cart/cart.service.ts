import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart-item.entity';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart) cartRepository: Repository<Cart>,
        @InjectRepository(CartItem) cartItemRepository: Repository<CartItem>
    ){}


}
