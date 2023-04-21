import { ConflictException, Injectable } from '@nestjs/common';
const bcrypt = require('bcrypt')
import { CreateEmployeeDto, UpdateEmployeeDto } from '../dtos/employee.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createEmployeeDto: CreateEmployeeDto) {
    const { emp_email, password } = createEmployeeDto
    const user = await this.prisma.employee.findFirst({ where: { emp_email } })
    if (user) {
      throw new ConflictException("User already exists")
    }
    const hashedPassword: string = await bcrypt.hash(password, 10)
    return this.prisma.employee.create({
      data: { ...createEmployeeDto, password: hashedPassword }
    });

  }

  async findAll() {
    const users = await this.prisma.employee.findMany();
    if (users.length <= 0) {
      return "No users found"
    }
    return users
  }

  async findOne(id: string) {
    const user = await this.prisma.employee.findFirst({ where: { id } });
    if (!user) {
      throw new ConflictException("User not found")
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


} 
