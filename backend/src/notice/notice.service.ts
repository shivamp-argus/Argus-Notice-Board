import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateNoticeDto, UpdateNoticeDto } from '../dtos/notice.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ServiceUnavailableException } from '@nestjs/common';
import { validate } from 'class-validator';



@Injectable()
export class NoticeService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createNoticeDto: CreateNoticeDto) {
    const error = await validate(createNoticeDto)
    if (error.length > 0) throw new BadRequestException('Enter required data')
    const { notice_title, notice_body, category, issuer_id } = createNoticeDto
    const { id } = await this.prisma.category.findUniqueOrThrow({ where: { category } })
    const notice = await this.prisma.notice.create({
      data: {
        notice_title,
        notice_body,
        issuer_id,
        category_id: id,
      },
    });
    if (!notice) throw new ServiceUnavailableException('Service unavaliable')
    return 'Notice Created'
  }

  findAll(id: string) {
    // const published: boolean = status === 'active' ? true : false
    return this.prisma.notice.findMany({
      where: {
        issuer_id: id
      },
      include: {
        category: {
          select: {
            category: true
          }
        }
      }
    });
  }

  viewAllBySuperadmin() {
    return this.prisma.notice.findMany({
      include: {
        Employee: {
          select: {
            emp_name: true
          }
        },
        category: {
          select: {
            category: true
          }
        }
      }
    })
  }

  async findOne(id: string, userId: string) {
    const notice = await this.prisma.notice.findUnique({ where: { id_issuer_id: { id, issuer_id: userId } } });
    if (!notice) throw new NotFoundException('Notice Not Found')
    return notice
  }

  async update(id: string, updateNoticeDto: UpdateNoticeDto, userId: string) {
    const errors = await validate(updateNoticeDto)
    if (errors.length > 0) throw new BadRequestException('Enter required data')
    const notice = await this.findOne(id, userId)
    if (!notice) throw new UnauthorizedException("You are not authorized")
    let category_id: string;
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

  async publishNotice(id: string) {
    return this.prisma.notice.update({ where: { id }, data: { published: true } })
  }
}
