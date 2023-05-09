import { Body, Controller, Post, Get, Param, Delete, Patch, HttpException } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryRequestDto, CreateCategoryDto } from 'src/dtos/category.dto';
import { Roles } from 'src/employees/auth/decorators/auth.decorator';
import { Role } from '@prisma/client';
import User from 'src/employees/decorators/employees.decorator';
import { JWTPayload } from 'src/dtos/auth.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Roles(Role.HR, Role.SUPERADMIN)
    @Post()
    create(@Body() body: CategoryRequestDto, @User() user: JWTPayload) {
        const category: CreateCategoryDto = { ...body, createdBy: user.id }
        return this.categoriesService.create(category)
    }

    // @Roles(Role.HR, Role.SUPERADMIN)
    // @Patch('/:action/:id')
    // activateCategory(@Param('id') id: string, @Param('action') action: string) {
    //     const statusPattern = /^(activate|deactivate)$/
    //     if (!statusPattern.test(action)) throw new HttpException('URL not valid', 400)
    //     return this.categoriesService.activateCategory(id, action)
    // }

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
