import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { validate } from 'class-validator';
import { CreateCategoryDto } from 'src/dtos/category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createCategoryDto: CreateCategoryDto) {

        const error = await validate(createCategoryDto)
        if (error.length > 0) throw new BadRequestException('Enter required data')
        const validCategory = await this.prisma.category.findFirst({ where: { category: createCategoryDto.category } })
        // console.log(validCategory);

        if (validCategory) throw new ConflictException('Category already exists')

        return this.prisma.category.create({ data: { ...createCategoryDto, isActive: true } })


    }
    async findAll() {
        return this.prisma.category.findMany({ where: { isActive: true }, include: { Employee: { select: { emp_name: true } } } })
    }
    async getById(id: string) {
        return this.prisma.category.findUnique({ where: { id } })
    }
    async deleteCategory(id: string) {
        const category = await this.getById(id)
        if (!category) {
            throw new NotFoundException("Category Not Found")
        }
        const allowDelete = await this.prisma.notice.findMany({ where: { category_id: id } })
        if (allowDelete.length <= 0) {
            return this.prisma.category.delete({ where: { id } })
        }
        return 'There are some notice under this category'
    }

    async activateCategory(id: string, action: string) {
        await this.getById(id)
        if (action === 'activate') {
            await this.prisma.category.update({ where: { id }, data: { isActive: true } })
            return 'Category Activated'
        }
        else {
            await this.prisma.category.update({ where: { id }, data: { isActive: false } })
            return 'Category Deactivated'
        }

    }
}
