import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
const bcrypt = require('bcrypt')
import { CreateEmployeeDto, UpdateEmployeeDto } from '../dtos/employee.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JWTPayload } from 'src/dtos/auth.dto';
import { UnauthorizedException } from '@nestjs/common';


@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) { }



  async findAll(status: string) {
    const isActive = status === 'active' ? true : false
    const users = await this.prisma.employee.findMany({ where: { isActive } });
    if (users.length <= 0) {
      return "No users found"
    }
    const newUsers = users.filter(user => user.role !== 'SUPERADMIN')
    return newUsers
  }

  async findOne(id: string) {
    const user = await this.prisma.employee.findFirst({ where: { id }, include: { Employee_Team: true } });
    if (!user) {
      throw new NotFoundException("User not found")
    }
    return user
  }

  async update(user: JWTPayload, updateEmployeeDto: UpdateEmployeeDto) {
    const fetchedUser = await this.findOne(user.id)
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
