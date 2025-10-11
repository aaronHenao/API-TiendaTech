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
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductCartResponseDto } from './dto/product-cart-response.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
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
        const { categoryIds = [], ...productDetails } = createProductDto;

        const savedProduct = await this.productRepository.save(
            this.productRepository.create(productDetails)
        );


        if (categoryIds.length === 0) {
            return plainToInstance(ProductResponseDto, savedProduct);
        }


        const categories = await this.categoryService.findByIds(categoryIds);
        const foundIds = categories.map(c => c.id);
        const invalidCategoryIds = categoryIds.filter(id => !foundIds.includes(id));

        
        if (categories.length > 0) {
            const relations = categories.map(category =>
            this.productCategoryRepository.create({
                productId: savedProduct.id,
                categoryId: category.id,
            }),
            );
            await this.productCategoryRepository.save(relations);
        }

        
        const response = plainToInstance(ProductResponseDto, {
            ...savedProduct,
            categories: plainToInstance(CategoryResponseDto, categories),
        }, {excludeExtraneousValues: true}) as any;

        if (invalidCategoryIds.length > 0) {
            response.warning = `Las siguientes categorías no se asociaron porque no existen: ${invalidCategoryIds.join(', ')}`;
        }

        return response;
    }


    async update(id: number, productUpdate: UpdateProductDto): Promise<ProductResponseDto>{
        const product = await this.productRepository.preload({id: id, ...productUpdate});

        if(!product){
            throw new NotFoundException(`Producto con id ${id} no existe`)
        }
        const updatedProduct = this.productRepository.save(product)
        return plainToInstance(ProductResponseDto, updatedProduct)
    }

    async delete(id: number): Promise<ProductResponseDto>{
        const product = await this.productRepository.findOneBy({id});

        if(!product){
            throw new NotFoundException(`Producto con id ${id} no existe`)
        }
        await this.productCategoryRepository.delete({ productId: id });
        
        await this.productRepository.remove(product)
        return plainToInstance(ProductResponseDto, product)
    }

    async getById(id: number): Promise<ProductCartResponseDto>{
        const product = await this.productRepository.findOneBy({id})

        if(!product){
            throw new NotFoundException(`El producto con id ${id} no existe`)
        }

        return plainToInstance(ProductCartResponseDto, product, {excludeExtraneousValues: true,});
    }
}

