import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateGroupDto } from 'src/dtos/group.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeamService {
    constructor(private readonly prisma: PrismaService) { }

    createTeam(createGroupDto: CreateGroupDto) {
        return this.prisma.team.create({ data: createGroupDto })
    }
    async findAllTeam() {
        const teams = await this.prisma.team.findMany()
        if (teams.length <= 0) {
            throw new NotFoundException("Group not found")
        }
        return teams
    }
}
