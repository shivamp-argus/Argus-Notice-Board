import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { validate } from 'class-validator';
import { waitForDebugger } from 'inspector';

import { CreateTeamDto, TeamRequestDto } from 'src/dtos/team.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeamService {
    constructor(private readonly prisma: PrismaService) { }

    async createTeam(data: TeamRequestDto, userId: string) {

        const team = await this.prisma.team.findFirst({ where: { team_name: data.team_name } })
        if (team) throw new ConflictException('Team already exists')

        const createTeamDto: CreateTeamDto = new CreateTeamDto({ ...data, createdBy: userId })

        const error = await validate(createTeamDto)
        if (error.length > 0) throw new BadRequestException('Enter valid details')

        return this.prisma.team.create({ data: createTeamDto })
    }
    async findAllTeam() {
        const teams = await this.prisma.team.findMany({
            include:
            {
                Employee: {
                    select: {
                        emp_name: true
                    }
                },
                Employee_Team: {
                    select: {
                        Employee: {
                            select: {
                                emp_name: true
                            }
                        }
                    }
                },
                Notice_Team: {
                    select: {
                        Notice: {
                            select: {
                                notice_title: true
                            }
                        }
                    }
                }
            }
        })
        if (teams.length <= 0) {
            throw new NotFoundException("Team not found")
        }
        return teams
    }

    async deleteTeam(id: string) {
        const team = await this.prisma.team.findUnique({ where: { id } })
        if (!team) {
            throw new NotFoundException('Team not found')
        }
        return this.prisma.team.delete({ where: { id } })
    }
}
