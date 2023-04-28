import { Body, Controller, Post, Get, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from 'src/dtos/category.dto';
import { Roles } from 'src/employees/auth/decorators/auth.decorator';
import { Role } from '@prisma/client';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Roles(Role.HR, Role.SUPERADMIN)
    @Post()
    create(@Body() body: CreateCategoryDto) {
        return this.categoriesService.create(body)
    }

    @Roles(Role.HR, Role.SUPERADMIN)
    @Get()
    findAll() {
        return this.categoriesService.findAll()
    }

    @Roles(Role.HR, Role.SUPERADMIN)
    @Delete(':id')
    deleteCategory(@Param('id') id: string) {
        return this.categoriesService.deleteCategory(id)
    }
}
