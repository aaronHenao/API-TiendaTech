import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order-item.entity";

export enum OrderStatus{
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    SHIPPED = 'SHIPPED',
    CANCELLED = 'CANCELLED'
}

@Entity()
export class Order{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int'})
    customerId: number;

    @Column({type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING})
    status: OrderStatus;

    @ManyToOne(() => User)
    customer: User;

    @OneToMany(()=> OrderItem, item => item.order)
    items: OrderItem[];
}