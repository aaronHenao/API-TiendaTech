import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { In, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryResponseDto } from './dto/category-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CategoryService {

    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>){}

    async getAll(): Promise<CategoryResponseDto[]>{
        const categories = await this.categoryRepository.find()

        if(!categories || categories.length === 0){
            throw new NotFoundException('No se encontraron categorias');
        }
        return categories.map(category => plainToInstance(CategoryResponseDto, category))
    }

    async getById(id: number): Promise<Category | null>{
        const category = await this.categoryRepository.findOneBy({id})
        if(category){
            return category;
        }
        return null;
    }

    async findByIds(ids: number[]): Promise<Category[]> {
        if (!ids || ids.length === 0) {
            return [];
        }
    
        const categories = await this.categoryRepository.findBy({
            id: In(ids),
        });

        return categories;
    }


    async create(newCategory: CreateCategoryDto): Promise<CategoryResponseDto>{
        const existingCategory = this.categoryRepository.findOneBy({name: newCategory.name})

        if(!existingCategory){
            throw new BadRequestException('La categoría ya está registrada en el sistema')
        }

        const category = await this.categoryRepository.create(newCategory);
        const savedCategory = await this.categoryRepository.save(category);
        return plainToInstance(CategoryResponseDto, savedCategory)
    }

    async update(id: number, updateCategory: CreateCategoryDto): Promise<CategoryResponseDto>{
        const category = await this.categoryRepository.preload({id: id, ...updateCategory})
        
        if(!category){
            throw new NotFoundException(`La categoria con id ${id} no existe`)
        }

        const existingCategory = await this.categoryRepository.findOneBy({name: updateCategory.name})

        if(existingCategory){
            throw new ConflictException(`La categoría ya existe`)
        }

        const updatedCategory = await this.categoryRepository.save(category)
        return plainToInstance(CategoryResponseDto, updatedCategory)
    }

    async delete(id: number): Promise<CategoryResponseDto>{
        const category = await this.categoryRepository.findOneBy({id});

        if(!category){
            throw new NotFoundException(`La categoría con id ${id} no existe`)
        }

        await this.categoryRepository.remove(category);
        return plainToInstance(CategoryResponseDto, category)
    }
}
