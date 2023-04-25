import { Module } from '@nestjs/common';
import { NoticeTeamController } from './notice_team.controller';
import { NoticeTeamService } from './notice_team.service';

@Module({
  controllers: [NoticeTeamController],
  providers: [NoticeTeamService]
})
export class NoticeTeamModule {}
