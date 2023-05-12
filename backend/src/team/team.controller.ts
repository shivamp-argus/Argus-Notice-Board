import { BadRequestException, Body, Controller, Delete, Get, HttpException, Param, Post } from '@nestjs/common';
import { CreateTeamDto, TeamRequestDto } from 'src/dtos/team.dto';
import { TeamService } from './team.service';
import { Roles } from 'src/employees/auth/decorators/auth.decorator';
import { Role } from '@prisma/client';
import User from 'src/employees/decorators/employees.decorator';
import { JWTPayload } from 'src/dtos/auth.dto';
import { validate } from 'class-validator';

@Controller('team')
export class TeamController {
    constructor(private readonly teamService: TeamService) { }

    @Roles(Role.HR, Role.SUPERADMIN)
    @Post()
    async createTeam(@Body() body: TeamRequestDto, @User() user: JWTPayload) {
        if (!user) throw new HttpException('You are not allowed', 400)

        const error = await validate(body)
        if (error.length > 0) throw new BadRequestException('Enter valid data')

        return this.teamService.createTeam(body, user.id)
    }

    @Roles(Role.HR, Role.SUPERADMIN)
    @Get()
    findAllTeam() {
        return this.teamService.findAllTeam()
    }

    @Roles(Role.HR, Role.SUPERADMIN)
    @Delete(':id')
    deleteTeam(@Param('id') id: string) {
        return this.teamService.deleteTeam(id)
    }
}
