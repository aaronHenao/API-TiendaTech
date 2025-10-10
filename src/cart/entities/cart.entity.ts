import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CartItem } from "./cart-item.entity";

@Entity()
export class Cart{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int'})
    customerId: number;

    @OneToOne(() => User, user => user.cart) 
    @JoinColumn({ name: 'customerId' }) 
    customer: User;

    @OneToMany(()=> CartItem, item => item.cart)
    items: CartItem[];

} 