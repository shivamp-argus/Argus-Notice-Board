import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTeamDto } from 'src/dtos/team.dto';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
    constructor(private readonly teamService: TeamService) { }

    @Post()
    createTeam(@Body() body: CreateTeamDto) {
        return this.teamService.createTeam(body)
    }

    @Get()
    findAllTeam() {
        return this.teamService.findAllTeam()
    }

    @Delete(':id')
    deleteTeam(@Param('id') id: string) {
        return this.teamService.deleteTeam(id)
    }
}
