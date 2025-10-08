import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryResponseDto } from './dto/category-response.dto';

@Injectable()
export class CategoryService {

    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>){}

    async getAll(): Promise<CategoryResponseDto[]>{
        const categories = await this.categoryRepository.find()

        if(!categories || categories.length === 0){
            throw new NotFoundException('No se encontraron categorias');
        }
        return categories.map(category => new CategoryResponseDto(category))
    }

    
    async create(newCategory: CreateCategoryDto): Promise<CategoryResponseDto>{
        const existingCategory = this.categoryRepository.findOneBy({name: newCategory.name})

        if(!existingCategory){
            throw new BadRequestException('La categoría ya está registrada en el sistema')
        }

        const category = await this.categoryRepository.create(newCategory);
        const savedCategory = await this.categoryRepository.save(category);
        return new CategoryResponseDto(savedCategory)
    }
}
