import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductCategory } from "./product-category.entity";
import { Review } from "src/review/entities/review.entity";

@Entity()
export class Product{

    @PrimaryGeneratedColumn()
    id: number;
    
    
    @Column({type: 'varchar', length: 100})
    name: string;

    @Column({type: 'varchar', length: 100, nullable: true})
    description: string;

    @Column({type: 'decimal', precision: 10, scale: 2})
    price: number;

    @Column({type: 'int'})
    stock: number;

    @OneToMany(() => ProductCategory, pc => pc.product)
    productCategories: ProductCategory[];

    @OneToMany(() => Review, review => review.product)
    reviews: Review[];
}