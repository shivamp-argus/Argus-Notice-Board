import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeController } from './notice.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [NoticeController],
  providers: [NoticeService]
})
export class NoticeModule { }
