import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Product } from "./product.entity";
import { Category } from "src/category/entities/category.entity";

@Entity()
@Unique(['productId', 'categoryId'])
export class ProductCategory{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productId: number;

    @Column()
    categoryId: number

    @ManyToOne(()=> Product, product => product.productCategories)
    product: Product;

    @ManyToOne(() => Category, category => category.productCategories)
    category: Category;

}