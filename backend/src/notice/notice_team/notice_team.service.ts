import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CATCH_WATERMARK } from '@nestjs/common/constants';
import { validate } from 'class-validator';
import { CreateNoticeTeamDto, NoticeTeamRequestDto } from 'src/dtos/notice.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NoticeTeamService {
    constructor(private readonly prisma: PrismaService) { }

    async createNoticeTeam(createNoticeTeam: NoticeTeamRequestDto[], userId: string) {

        const requestData: CreateNoticeTeamDto[] = []
        createNoticeTeam.map(data => {
            requestData.push(new CreateNoticeTeamDto({ ...data, addedBy: userId }))
        })

        await Promise.all(requestData.map(async noticeTeam => {
            const error = await validate(noticeTeam)
            if (error.length > 0) throw new BadRequestException('Enter required data')
        }))

        await Promise.all(createNoticeTeam.map(async noticeTeam => {
            noticeTeam = await this.prisma.notice_Team.findFirst({
                where: {
                    AND: {
                        notice_id: noticeTeam.notice_id,
                        team_id: noticeTeam.team_id
                    }
                }
            })
            if (noticeTeam) throw new ConflictException('Notice already in Team')
        }))

        await this.prisma.notice_Team.createMany({ data: requestData })

        return 'Notice added to team'

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
                                notice_body: true,
                                notice_title: true,
                                createdAt: true,
                                Employee: {
                                    select: {
                                        emp_name: true
                                    }
                                }
                            }
                        }
                    },
                    orderBy: {
                        Notice: {
                            createdAt: 'desc'
                        }
                    }
                }
            },




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
