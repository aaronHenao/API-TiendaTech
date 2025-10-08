import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { BaseApplicationResponse } from 'src/common/dto/base-application-response.dto';
import { CategoryResponseDto } from './dto/category-response.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService){}

    @Get()
    async getAll(): Promise<BaseApplicationResponse<CategoryResponseDto[]>>{
        const categories = await this.categoryService.getAll()
        return {
            statusCode: 200,
            message: 'Categorías obtenidas correctamente',
            data: categories
        };
    }

    @Post()
    async create(@Body() newCategory: CreateCategoryDto): Promise<BaseApplicationResponse<CategoryResponseDto>>{
        const category = await this.categoryService.create(newCategory);
        return{
            statusCode: 201, 
            message: 'Categoría creada correctamente',
            data: category
        }
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateCategory: CreateCategoryDto): Promise<BaseApplicationResponse<CategoryResponseDto>>{
        const updatedCategory = await this.categoryService.update(+id, updateCategory)
        return{
            statusCode: 202, 
            message: 'Categoría actualizada correctamente',
            data: updatedCategory
        }
    }

    @Delete(':id')
    async delete(@Param('id') id:string): Promise<BaseApplicationResponse<CategoryResponseDto>>{
        const category = await this.categoryService.delete(+id)
        return{
            statusCode: 202, 
            message:'Categoría eliminada correctamente',
            data: category
        }
    }
}
