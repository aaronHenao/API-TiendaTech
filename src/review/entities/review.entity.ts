import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Review{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int'})
    userId: number;

    @Column({type: 'int'})
    productId: number;

    @Column({type: 'varchar', length:255})
    comment: string;

    @ManyToOne(()=> User, user => user.reviews)
    user: User;

    @ManyToOne(()=> Product, product => product.reviews)
    product: Product;
}