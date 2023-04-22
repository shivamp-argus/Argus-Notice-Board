import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { EmpTeamService } from './emp-team.service';
import { CreateEmpTeamDto } from 'src/dtos/employee.dto';

@Controller('emp-team')
export class EmpTeamController {
    constructor(private readonly empTeamService: EmpTeamService) { }

    @Post()
    createEmpTeam(@Body() body: CreateEmpTeamDto | CreateEmpTeamDto[]) {
        return this.empTeamService.createEmpTeam(body)
    }

    @Get()
    getAllEmpTeam() {
        return this.empTeamService.getAllEmpTeam()
    }

    @Get(':id')
    getAllById(@Param('id') id: string) {
        return this.empTeamService.getAllById(id)

    }

    @Delete(':id')
    deleteById(@Param('id') id: string) {
        return this.empTeamService.deleteById(id)
    }


}
