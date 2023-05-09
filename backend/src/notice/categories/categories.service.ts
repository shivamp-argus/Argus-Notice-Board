import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from 'src/dtos/category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createCategoryDto: CreateCategoryDto) {
        return this.prisma.category.create({ data: createCategoryDto })
    }
    async findAll() {
        return this.prisma.category.findMany({ where: { isActive: true } })
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
