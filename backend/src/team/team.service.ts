import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTeamDto } from 'src/dtos/team.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeamService {
    constructor(private readonly prisma: PrismaService) { }

    createTeam(createGroupDto: CreateTeamDto) {
        return this.prisma.team.create({ data: createGroupDto })
    }
    async findAllTeam() {
        const teams = await this.prisma.team.findMany()
        if (teams.length <= 0) {
            throw new NotFoundException("Team not found")
        }
        return teams
    }
}
