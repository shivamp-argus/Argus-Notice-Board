import { Body, Controller, Delete, Get, HttpException, Param, Post } from '@nestjs/common';
import { CreateNoticeTeamDto, NoticeTeamRequestDto } from 'src/dtos/notice.dto';
import { NoticeTeamService } from './notice_team.service';
import { Roles } from 'src/employees/auth/decorators/auth.decorator';
import { Role } from '@prisma/client';
import User from 'src/employees/decorators/employees.decorator';
import { JWTPayload } from 'src/dtos/auth.dto';

@Controller('notice-team')
export class NoticeTeamController {
    constructor(private readonly noticeTeamService: NoticeTeamService) { }

    @Roles(Role.HR, Role.SUPERADMIN)
    @Post()
    createNoticeTeam(@Body() createNoticeTeam: NoticeTeamRequestDto[], @User() user: JWTPayload) {
        // const requestData: CreateNoticeTeamDto[] = createNoticeTeam.map(data => {
        //     return { ...data, addedBy: user.id }
        // })
        return this.noticeTeamService.createNoticeTeam(createNoticeTeam, user.id)
    }

    @Roles(Role.Employee)
    @Get('my-notice')
    getAllByCurrentUser(@User() user: JWTPayload) {
        if (!user) throw new HttpException("You are not authorised", 400)
        return this.noticeTeamService.getAllByCurrentUser(user.id)
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
