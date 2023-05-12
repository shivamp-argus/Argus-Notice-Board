import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmpTeamDto } from 'src/dtos/employee.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmpTeamService {
    constructor(private readonly prisma: PrismaService) { }

    async createEmpTeam(createEmpTeam: CreateEmpTeamDto[]) {

        createEmpTeam.map(async empTeam => {
            empTeam = await this.prisma.employee_Team.findFirst({
                where: {
                    AND: {
                        emp_id: empTeam.emp_id,
                        team_id: empTeam.team_id
                    }
                }
            })
            if (empTeam) throw new ConflictException('Employee already in Team')
        })
        await this.prisma.employee_Team.createMany({ data: createEmpTeam })
        return 'Employee added to Team'
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

    async getAllByCurrentUser(id: string) {
        return this.prisma.employee_Team.findMany({
            where: {
                emp_id: id
            },
            include: {
                Employee: {
                    select: {
                        emp_name: true
                    }
                },
                Team: {
                    select: {
                        team_name: true
                    }
                }
            }
        })
    }
}
