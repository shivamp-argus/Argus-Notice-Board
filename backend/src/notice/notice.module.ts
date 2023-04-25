import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeController } from './notice.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { NoticeTeamModule } from './notice_team/notice_team.module';

@Module({
  controllers: [NoticeController],
  providers: [NoticeService],
  imports: [NoticeTeamModule]
})
export class NoticeModule { }
