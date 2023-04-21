import { Body, Controller, Post, Get, Param } from '@nestjs/common';
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
}
