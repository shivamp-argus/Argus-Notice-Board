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
    return this.prisma.notice.findUnique({ where: { id } });
  }

  update(id: string, updateNoticeDto: UpdateNoticeDto) {
    console.log(id, updateNoticeDto)
    // return this.prisma.notice.update({where:{id},data:updateNoticeDto});
    return 'hii'
  }

  remove(id: string) {
    return `This action removes a #${id} notice`;
  }
}
