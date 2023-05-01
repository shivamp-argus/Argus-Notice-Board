import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmpTeamDto } from 'src/dtos/employee.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmpTeamService {
    constructor(private readonly prisma: PrismaService) { }

    createEmpTeam(createEmpTeam: CreateEmpTeamDto[]) {

        return this.prisma.employee_Team.createMany({ data: createEmpTeam })
    }

    getAllEmpTeam() {
        return this.prisma.employee_Team.findMany({ include: { Employee: true, Team: true } })
    }

    async getAllById(id: string) {
        const team = await this.prisma.team.findUnique({ where: { id } })
        const employee = await this.prisma.employee.findUnique({ where: { id } })
        if (!team && !employee) {
            throw new NotFoundException("Id not found")
        }
        return this.prisma.employee_Team.findMany({ where: { OR: [{ team_id: id }, { emp_id: id }] } })
    }

    async deleteById(id: string) {

        const empTeam = await this.prisma.employee_Team.findUnique({ where: { id } })
        if (!empTeam) throw new NotFoundException("Employee not found in team")

        // return this.prisma.employee_Team.deleteMany({ where: { OR: [{ team_id: id }, { team_id: id, emp_id }] } })
        return this.prisma.employee_Team.delete({ where: { id } })
    }

}
