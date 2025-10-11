import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { In, Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { CartService } from 'src/cart/cart.service';
import { CartItem } from 'src/cart/entities/cart-item.entity';
import { OrderResponseDto } from './dto/order-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(OrderItem) private orderItemRespository: Repository<OrderItem>,
        private readonly cartService: CartService
    ){}

    async createorder(userId:number): Promise<OrderResponseDto>{
        const existingOrder = await this.orderRepository.findOne({where: {customerId: userId, status: In([OrderStatus.PENDING, OrderStatus.PROCESSING])}});

        if(existingOrder){
            return this.processOrder(existingOrder);
        }

        const newOrder = this.orderRepository.create({customerId: userId, status: OrderStatus.PENDING});
        await this.orderRepository.save(newOrder);
        return this.processOrder(newOrder)
    }

    private async processOrder(newOrder: Order): Promise<OrderResponseDto>{
        const orderItems = await this.cartService.getCartItemsWithStock(newOrder.customerId);

        for(const item of orderItems){
            if(item.quantity > item.product.stock){
                throw new ConflictException(`No hay stock suficiente para el producto  ${item.product.name}. Stock disponible: ${item.product.stock}`)
            }
        }

        newOrder.status = OrderStatus.PROCESSING;
        await this.orderRepository.save(newOrder);
        return this.completeOrder(newOrder, orderItems)
    }

    private async completeOrder(order: Order, orderItems: CartItem[]): Promise<OrderResponseDto>{
        const items: OrderItem[] =[];

        for(const item of orderItems){
            const newOrderItem = await this.orderItemRespository.create({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.product.price,
            })
            items.push(newOrderItem);
            await this.cartService.reduceStock(item.productId, item.quantity);
        }
        await this.orderItemRespository.save(items);
        await this.cartService.toEmptyCart(orderItems[0].cartId);

        order.status = OrderStatus.SHIPPED;

        await this.orderRepository.save(order);
        return plainToInstance(OrderResponseDto, {id: order.id, status: order.status, items: items}, {excludeExtraneousValues: true });
    }
}
