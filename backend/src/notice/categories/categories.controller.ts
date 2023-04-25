import { Body, Controller, Post, Get, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from 'src/dtos/category.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Post()
    create(@Body() body: CreateCategoryDto) {
        return this.categoriesService.create(body)
    }
    @Get()
    findAll() {
        return this.categoriesService.findAll()
    }

    @Delete(':id')
    deleteCategory(@Param('id') id: string) {
        return this.categoriesService.deleteCategory(id)
    }
}
