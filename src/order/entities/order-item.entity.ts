import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "src/product/entities/product.entity";

@Entity()
@Unique(['orderId', 'productId'])
export class OrderItem{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    orderId: number;

    @Column()
    productId: number;

    @Column({type: 'int'})
    quantity: number;

    @Column({type: 'decimal', precision: 10, scale: 2})
    price: number;

    @ManyToOne(()=> Order, order => order.items)
    order: Order;

    @ManyToOne(()=> Product)
    product: Product
}