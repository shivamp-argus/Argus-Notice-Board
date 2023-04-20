import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateGroupDto } from 'src/dtos/group.dto';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
    constructor(private readonly teamService: TeamService) { }

    @Post()
    createGroup(@Body() body: CreateGroupDto) {
        return this.teamService.createTeam(body)
    }

    @Get()
    findAllGroup() {
        return this.teamService.findAllTeam()
    }
}
