import { Injectable } from '@nestjs/common';
import { CreateNoticeDto, UpdateNoticeDto } from '../dtos/create-notice.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class NoticeService {
  constructor(private readonly prisma: PrismaService) { }
  create(createNoticeDto: CreateNoticeDto, id: string) {
    return this.prisma.notices.create({
      data: {
        ...createNoticeDto,
        issuer_id: id,
        // issuer: { connect: { id: id } },
        // category:{connect:{}}
      }
    });
  }

  findAll() {
    return `This action returns all notice`;
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
