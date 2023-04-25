import { ConflictException, Injectable } from '@nestjs/common';
import { CATCH_WATERMARK } from '@nestjs/common/constants';
import { CreateNoticeTeamDto } from 'src/dtos/notice.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NoticeTeamService {
    constructor(private readonly prisma: PrismaService) { }

    async createNoticeTeam(createNoticeTeam: CreateNoticeTeamDto | CreateNoticeTeamDto[]) {
        try {
            const noticeTeams = await this.prisma.notice_Team.createMany({ data: createNoticeTeam })
            if (!noticeTeams) {
                throw new ConflictException("Already a member")
            }
            return noticeTeams
        } catch (error) {
            error.message = "Unique constraint failed"
            return error.message
        }


    }

    getAllNoticeTeam() {
        return this.prisma.notice_Team.findMany()
    }

    async getNoticeTeamById(id: string) {
        return this.prisma.notice_Team.findUniqueOrThrow({ where: { id } })
    }

    async deleteNoticeTeam(id: string) {
        await this.getNoticeTeamById(id)
        return this.prisma.notice_Team.delete({ where: { id } })
    }
}
