import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { EmpTeamService } from './emp-team.service';
import { CreateEmpTeamDto } from 'src/dtos/employee.dto';
import { Roles } from '../auth/decorators/auth.decorator';
import { Role } from '@prisma/client';

@Controller('emp-team')
export class EmpTeamController {
    constructor(private readonly empTeamService: EmpTeamService) { }

    @Roles(Role.HR, Role.SUPERADMIN)
    @Post()
    createEmpTeam(@Body() body: CreateEmpTeamDto | CreateEmpTeamDto[]) {
        return this.empTeamService.createEmpTeam(body)
    }

    @Roles(Role.HR, Role.SUPERADMIN)
    @Get()
    getAllEmpTeam() {
        return this.empTeamService.getAllEmpTeam()
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
