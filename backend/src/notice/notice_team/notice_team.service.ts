import { ConflictException, Injectable } from '@nestjs/common';
import { CATCH_WATERMARK } from '@nestjs/common/constants';
import { CreateNoticeTeamDto } from 'src/dtos/notice.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NoticeTeamService {
    constructor(private readonly prisma: PrismaService) { }

    async createNoticeTeam(createNoticeTeam: CreateNoticeTeamDto[]) {
        try {
            console.log('noticeTeams');
            const noticeTeams = await this.prisma.notice_Team.createMany({ data: createNoticeTeam })

            if (!noticeTeams) {
                throw new ConflictException("Already a member")
            }
            return 'Notice added to Team'
        } catch (error) {
            error.message = "Unique constraint failed"
            return error.message
        }


    }

    async getAllByCurrentUser(id: string) {
        return this.prisma.team.findMany({
            where: {
                Employee_Team: { some: { emp_id: id } }
            },
            include: {
                Employee: {
                    select: {
                        emp_name: true
                    }
                },
                Notice_Team: {
                    include: {
                        Notice: {
                            select: {
                                notice_title: true
                            }
                        }
                    }
                }
            }

        })
    }

    async getNoticeTeamById(id: string) {
        return this.prisma.notice_Team.findUniqueOrThrow({ where: { id } })
    }

    async deleteNoticeTeam(id: string) {
        await this.getNoticeTeamById(id)
        return this.prisma.notice_Team.delete({ where: { id } })
    }
}
