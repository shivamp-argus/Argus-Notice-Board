import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateNoticeDto, UpdateNoticeDto } from '../dtos/notice.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class NoticeService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createNoticeDto: CreateNoticeDto) {
    const { notice_body, category, issuer_id } = createNoticeDto
    const { id } = await this.prisma.category.findUniqueOrThrow({ where: { category } })
    return this.prisma.notice.create({
      data: {
        notice_body,
        issuer_id,
        category_id: id,
      },

    });
  }

  findAll(id: string) {
    return this.prisma.notice.findMany({ where: { issuer_id: id } });
  }

  viewAllBySuperadmin() {
    return this.prisma.notice.findMany()
  }

  async findOne(id: string, userId: string) {
    const notice = await this.prisma.notice.findUnique({ where: { id_issuer_id: { id, issuer_id: userId } } });
    if (!notice) throw new NotFoundException('Notice Not Found')
    return notice
  }

  async update(id: string, updateNoticeDto: UpdateNoticeDto, userId: string) {
    const notice = await this.findOne(id, userId)
    if (!notice) throw new UnauthorizedException("You are not authorized")
    let category_id;
    if ('category' in updateNoticeDto) {
      const category = await this.prisma.category.findFirst({ where: { category: updateNoticeDto.category } })
      category_id = category.id
    }

    return this.prisma.notice.update({
      where: { id }, data: {
        notice_body: updateNoticeDto.notice_body,
        published: updateNoticeDto.published,
        issuer_id: updateNoticeDto.issuer_id,
        category_id
      }
    });

  }

  async remove(id: string, userId: string) {
    const notice = await this.findOne(id, userId)
    if (!notice) throw new UnauthorizedException("You are not authorized")
    return this.prisma.notice.delete({ where: { id } });
  }
}
