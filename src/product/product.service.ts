import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoryService } from 'src/category/category.service';
import { ProductResponseDto } from './dto/product-response.dto';
import { plainToInstance } from 'class-transformer';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductCategory } from './entities/product-category.entity';
import { CategoryResponseDto } from 'src/category/dto/category-response.dto';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(ProductCategory) private productCategoryRepository: Repository<ProductCategory>,  
        private readonly categoryService: CategoryService
    ){}

    async getAll(): Promise<ProductResponseDto[]>{
        const products = await this.productRepository.find()
        if(!products || products.length === 0){
            throw new NotFoundException('No se encontraron productos');
        }
        return products.map(product => plainToInstance(ProductResponseDto, product))
    }

    async create(createProductDto: CreateProductDto): Promise<ProductResponseDto> {
        const { categoryIds, ...productDetails } = createProductDto;

        const newProductEntity = this.productRepository.create(productDetails);
        const savedProduct = await this.productRepository.save(newProductEntity);

        let invalidCategoryIds: number[] = [];
        let validCategories: any[] = [];

        if (categoryIds && categoryIds.length > 0) {

            const categories = await this.categoryService.findByIds(categoryIds);

            const foundIds = categories.map(c => c.id);
            invalidCategoryIds = categoryIds.filter(id => !foundIds.includes(id));
            validCategories = categories;
            
            if (categories.length > 0) {
            const relations = categories.map(category =>
                this.productCategoryRepository.create({
                productId: savedProduct.id,
                categoryId: category.id,
                }),
            );

            await this.productCategoryRepository.save(relations);
            }
        }

        const response = plainToInstance(ProductResponseDto, savedProduct, {
            excludeExtraneousValues: true,
        }) as any;

        if (validCategories.length > 0) {
            response.categories = plainToInstance(CategoryResponseDto, validCategories, {
            excludeExtraneousValues: true,
            });
        }


        if (invalidCategoryIds.length > 0) {
            response.warning = `Las siguientes categorías no se asociaron porque no existen: ${invalidCategoryIds.join(', ')}`;
        }
        return response;
    }

}

