import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateNoticeTeamDto } from 'src/dtos/notice.dto';
import { NoticeTeamService } from './notice_team.service';

@Controller('notice-team')
export class NoticeTeamController {
    constructor(private readonly noticeTeamService: NoticeTeamService) { }

    @Post()
    createNoticeTeam(@Body() createNoticeTeam: CreateNoticeTeamDto | CreateNoticeTeamDto[]) {
        return this.noticeTeamService.createNoticeTeam(createNoticeTeam)
    }

    @Get()
    getAllNoticeTeam() {
        return this.noticeTeamService.getAllNoticeTeam()
    }

    @Get(':id')
    getNoticeTeamById(@Param('id') id: string) {
        return this.noticeTeamService.getNoticeTeamById(id)
    }

    @Delete(':id')
    deleteNoticeTeam(@Param('id') id: string) {
        return this.noticeTeamService.deleteNoticeTeam(id)
    }
}
