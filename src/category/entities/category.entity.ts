import { ProductCategory } from "src/product/entities/product-category.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Category{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 100, unique: true})
    name: string;

    @OneToMany(() => ProductCategory, pc => pc.category)
    productCategories: ProductCategory[];
}