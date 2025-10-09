import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { BaseApplicationResponse } from 'src/common/dto/base-application-response.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService){}

    @Get()
    async getAll(): Promise<BaseApplicationResponse<ProductResponseDto[]>>{
        const products = await this.productService.getAll()
        return {
            statusCode: 200,
            message: 'Productos obtenidos correctamente',
            data: products 
        };
    }

    @Post()
    async create(@Body() newProduct: CreateProductDto): Promise<BaseApplicationResponse<ProductResponseDto>>{
        const product = await this.productService.create(newProduct)
        return{
            statusCode: 201, 
            message: 'Producto creado correctamente',
            data: product
        }
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updatedProduct: UpdateProductDto): Promise<BaseApplicationResponse<ProductResponseDto>>{
        const product = await this.productService.update(+id, updatedProduct);
        return{
            statusCode: 202, 
            message: 'Producto actualizado correctamente',
            data: product
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string){
        const product = await this.productService.delete(+id);
        return{
            statusCode: 202, 
            message:'Producto eliminado correctamente',
            data: product
        }
    }


}
