import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { BaseApplicationResponse } from 'src/common/dto/base-application-response.dto';
import { CategoryResponseDto } from './dto/category-response.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { Rol } from 'src/user/entities/user.entity';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService){}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getAll(): Promise<BaseApplicationResponse<CategoryResponseDto[]>>{
        const categories = await this.categoryService.getAll()
        return {
            statusCode: 200,
            message: 'Categorías obtenidas correctamente',
            data: categories
        };
    }

    @Post()
    @Roles(Rol.ADMIN)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async create(@Body() newCategory: CreateCategoryDto): Promise<BaseApplicationResponse<CategoryResponseDto>>{
        const category = await this.categoryService.create(newCategory);
        return{
            statusCode: 201, 
            message: 'Categoría creada correctamente',
            data: category
        }
    }

    @Patch(':id')
    @Roles(Rol.ADMIN)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async update(@Param('id') id: string, @Body() updateCategory: CreateCategoryDto): Promise<BaseApplicationResponse<CategoryResponseDto>>{
        const updatedCategory = await this.categoryService.update(+id, updateCategory)
        return{
            statusCode: 202, 
            message: 'Categoría actualizada correctamente',
            data: updatedCategory
        }
    }

    @Delete(':id')
    @Roles(Rol.ADMIN)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async delete(@Param('id') id:string): Promise<BaseApplicationResponse<CategoryResponseDto>>{
        const category = await this.categoryService.delete(+id)
        return{
            statusCode: 202, 
            message:'Categoría eliminada correctamente',
            data: category
        }
    }
}
