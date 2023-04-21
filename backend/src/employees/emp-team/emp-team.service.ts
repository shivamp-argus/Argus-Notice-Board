import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { resourceUsage } from 'process';
import { CreateEmpTeamDto } from 'src/dtos/employee.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmpTeamService {
    constructor(private readonly prisma: PrismaService) { }

    createEmpTeam(createEmpTeam: CreateEmpTeamDto | CreateEmpTeamDto[]) {
        return this.prisma.employee_Team.createMany({ data: createEmpTeam })
    }

    getAllEmpTeam() {
        return this.prisma.employee_Team.findMany()
    }

    async getAllById(id: string) {
        const team = await this.prisma.team.findUnique({ where: { id } })
        const employee = await this.prisma.employee.findUnique({ where: { id } })
        if (!team && !employee) {
            throw new NotFoundException("Id not found")
        }
        return this.prisma.employee_Team.findMany({ where: { OR: [{ team_id: id }, { emp_id: id }] } })
    }

    async deleteById(id: string, emp_id?: string) {
        const team = await this.prisma.team.findUnique({ where: { id } })
        const employee = await this.prisma.employee.findUnique({ where: { id: emp_id } })
        if (!employee) {
            throw new NotFoundException("Employee not found")
        }
        if (!team) {
            throw new NotFoundException("Id not found")
        }
        return this.prisma.employee_Team.deleteMany({ where: { OR: [{ team_id: id }, { emp_id }] } })
    }

}
