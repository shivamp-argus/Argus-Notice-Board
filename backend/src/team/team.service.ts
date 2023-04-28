import { Injectable, NotFoundException } from '@nestjs/common';
import { waitForDebugger } from 'inspector';

import { CreateTeamDto } from 'src/dtos/team.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeamService {
    constructor(private readonly prisma: PrismaService) { }

    createTeam(createTeamDto: CreateTeamDto) {
        return this.prisma.team.create({ data: createTeamDto })
    }
    async findAllTeam() {
        const teams = await this.prisma.team.findMany()
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
