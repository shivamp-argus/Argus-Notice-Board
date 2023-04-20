import { Injectable } from '@nestjs/common';
import { CreateNoticeDto, UpdateNoticeDto } from '../dtos/create-notice.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class NoticeService {
  constructor(private readonly prisma: PrismaService) { }
  create(createNoticeDto: CreateNoticeDto, issuerId: string, category_id: string) {
    console.log(createNoticeDto)
    const team_id = "c44ca564-39e2-4d01-aaaa-86595839efcc"
    return this.prisma.notice.create({
      data: {
        ...createNoticeDto,
        issuer_id: issuerId,
        Employee: { connect: { id: issuerId } },
        category_id: category_id,
        category: { connect: { id: category_id } },
        Notice_Team: { connect: { id: team_id } }
      },

    });
    // return 'hii'
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
