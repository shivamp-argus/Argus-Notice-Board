import { BadRequestException, Body, Controller, Delete, Get, HttpException, Param, Post, Query } from '@nestjs/common';
import { EmpTeamService } from './emp-team.service';
import { CreateEmpTeamDto, EmpTeamRequestDto } from 'src/dtos/employee.dto';
import { Roles } from '../auth/decorators/auth.decorator';
import { Role } from '@prisma/client';
import User from '../decorators/employees.decorator';
import { JWTPayload } from 'src/dtos/auth.dto';
import { validate } from 'class-validator';

@Controller('emp-team')
export class EmpTeamController {
    constructor(private readonly empTeamService: EmpTeamService) { }

    @Roles(Role.HR, Role.SUPERADMIN)
    @Post()
    async createEmpTeam(@Body() body: EmpTeamRequestDto[], @User() user: JWTPayload) {
        if (!user) throw new HttpException("You are not authorised", 400)
        return this.empTeamService.createEmpTeam(body, user.id)
    }

    @Roles(Role.HR, Role.SUPERADMIN)
    @Get()
    getAllEmpTeam() {
        return this.empTeamService.getAllEmpTeam()
    }
    @Roles(Role.EMPLOYEE)
    @Get('my-teams')
    getAllByCurrentUser(@User() user: JWTPayload) {
        if (!user) throw new HttpException('You are not authorised', 400)
        return this.empTeamService.getAllByCurrentUser(user.id)
    }

    @Roles(Role.HR, Role.SUPERADMIN)
    @Get(':id')
    getAllById(@Param('id') id: string) {
        return this.empTeamService.getAllById(id)

    }

    @Roles(Role.HR, Role.SUPERADMIN)
    @Delete(':id')
    deleteById(@Param('id') id: string) {
        return this.empTeamService.deleteById(id)
    }



}
