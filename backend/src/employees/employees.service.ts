import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
const bcrypt = require('bcrypt')
import { CreateEmployeeDto, UpdateEmployeeDto } from '../dtos/employee.dto';
import { PrismaService } from 'src/prisma/prisma.service';


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
    const user = await this.prisma.employee.findFirst({ where: { id } });
    if (!user) {
      throw new NotFoundException("User not found")
    }
    return user
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    await this.findOne(id)
    return this.prisma.employee.update({ where: { id }, data: updateEmployeeDto });
  }

  async remove(id: string) {
    await this.findOne(id)
    return this.prisma.employee.delete({ where: { id } });
  }

  async activateEmployee(id: string) {
    this.findOne(id)
    return this.prisma.employee.update({ where: { id }, data: { isActive: true } })

  }
} 
