import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";
import { Product } from "src/product/entities/product.entity";

@Entity()
export class CartItem{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int'})
    cartId: number;

    @Column({type: 'int'})
    productId: number;

    @Column({type: 'int'})
    quantity: number;

    @ManyToOne(() => Cart, cart => cart.items)
    cart: Cart;

    @ManyToOne(() => Product)
    product: Product;
}