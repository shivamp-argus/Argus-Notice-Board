import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from 'src/dtos/create-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createCategoryDto: CreateCategoryDto) {
        return this.prisma.category.create({ data: createCategoryDto })
    }
    async findAll() {
        return this.prisma.category.findMany()
    }
}
