import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
const bcrypt = require('bcrypt')
import { CreateEmployeeDto, ProfileDto, UpdateEmployeeDto } from '../dtos/employee.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JWTPayload } from 'src/dtos/auth.dto';
import { UnauthorizedException } from '@nestjs/common';
import { log } from 'console';


@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) { }



  async findAll(status: string) {
    const isActive = status === 'active' ? true : false
    const users = await this.prisma.employee.findMany({ where: { isActive } });
    if (users.length <= 0) {
      return users
    }
    const newUsers = users.filter(user => user.role !== 'SUPERADMIN')
    return newUsers
  }

  async findOne(id: string) {
    const user = await this.prisma.employee.findFirst(
      {
        where:
        {
          id
        },
        include:
        {
          Employee_Team: {
            select: {
              Team: {
                select: {
                  team_name: true,

                }
              },

            }
          }
        }
      });

    if (!user) throw new NotFoundException("User not found")

    const noticesList = await this.prisma.notice_Team.findMany({
      where: {
        Team: {
          Employee_Team: {
            some: {
              emp_id: id
            }
          }
        }
      },
      include: {
        Notice: {
          select: {
            notice_title: true
          }
        }
      },
      distinct: ['notice_id']

    })
    if (!noticesList) throw new NotFoundException("Notices not found")

    const teams = []
    const notices = []

    user.Employee_Team.map(team => teams.push(team))
    noticesList.map(notice => notices.push({ notice_title: notice.Notice.notice_title }))

    return new ProfileDto({
      user: {
        id: user.id,
        emp_name: user.emp_name,
        emp_email: user.emp_email,
        isActive: user.isActive,
        role: user.role,
        Employee_Team: teams

      },
      notices: notices
    })


  }

  async update(user: JWTPayload, updateEmployeeDto: UpdateEmployeeDto) {
    const fetchedUser = await this.prisma.employee.findUnique({
      where: { id: user.id }
    })
    if (!fetchedUser) throw new NotFoundException('Employee not found')
    if (fetchedUser.id !== user.id) throw new UnauthorizedException('You are not authorised')
    return this.prisma.employee.update({ where: { id: user.id }, data: updateEmployeeDto });
  }

  async activateEmployee(id: string, action: string) {
    await this.findOne(id)
    if (action === 'activate') {
      await this.prisma.employee.update({ where: { id }, data: { isActive: true } })
      return 'Employee Activated'
    }
    else {
      await this.prisma.employee.update({ where: { id }, data: { isActive: false } })
      return 'Employee Deactivated'
    }

  }
} 
