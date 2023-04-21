import { Injectable } from '@nestjs/common';
import { CreateNoticeDto, UpdateNoticeDto } from '../dtos/notice.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class NoticeService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createNoticeDto: CreateNoticeDto, issuerId: { id: string }) {
    const { notice_body, category } = createNoticeDto
    const { id } = await this.prisma.category.findUniqueOrThrow({ where: { category } })
    return this.prisma.notice.create({
      data: {
        notice_body,
        issuer_id: issuerId.id,
        category_id: id,
      },

    });
  }

  findAll() {
    return this.prisma.notice.findMany();
  }

  findOne(id: string) {
    return `This action returns a #${id} notice`;
  }

  update(id: string, updateNoticeDto: UpdateNoticeDto) {
    return `This action updates a #${id} notice`;
  }

  remove(id: string) {
    return `This action removes a #${id} notice`;
  }
}
