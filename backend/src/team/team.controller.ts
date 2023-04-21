import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTeamDto } from 'src/dtos/team.dto';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
    constructor(private readonly teamService: TeamService) { }

    @Post()
    createGroup(@Body() body: CreateTeamDto) {
        return this.teamService.createTeam(body)
    }

    @Get()
    findAllGroup() {
        return this.teamService.findAllTeam()
    }
}
