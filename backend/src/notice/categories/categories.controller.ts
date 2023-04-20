import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from 'src/dtos/create-category.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Post(':id')
    create(@Body() body: CreateCategoryDto, @Param() id: string) {
        return this.categoriesService.create(body)
    }

    @Get()
    findAll() {
        return this.categoriesService.findAll()
    }
}
