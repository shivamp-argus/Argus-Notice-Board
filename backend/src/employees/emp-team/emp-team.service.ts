import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { validate } from 'class-validator';
import { CreateEmpTeamDto, EmpTeamRequestDto } from 'src/dtos/employee.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmpTeamService {
    constructor(private readonly prisma: PrismaService) { }

    async createEmpTeam(createEmpTeam: EmpTeamRequestDto[], userId: string) {
        const requestData: CreateEmpTeamDto[] = []

        createEmpTeam.map(data => {
            requestData.push(new CreateEmpTeamDto({ ...data, addedBy: userId }))
        })

        await Promise.all(requestData.map(async data => {
            const error = await validate(data)
            if (error.length > 0) throw new BadRequestException('Enter required fields')
        }))

        await Promise.all(createEmpTeam.map(async empTeam => {
            empTeam = await this.prisma.employee_Team.findFirst({
                where: {
                    AND: {
                        emp_id: empTeam.emp_id,
                        team_id: empTeam.team_id
                    }
                }
            })
            if (empTeam) throw new ConflictException('Employee already in Team')
        }))

        await this.prisma.employee_Team.createMany({ data: requestData })

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
