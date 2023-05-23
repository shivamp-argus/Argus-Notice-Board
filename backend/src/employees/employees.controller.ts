import { Controller, Get, Body, Patch, Param, Delete, HttpException, UnauthorizedException } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { UpdateEmployeeDto, EmployeeResponseDto, ProfileDto } from '../dtos/employee.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { Roles } from './auth/decorators/auth.decorator';
import { Role } from '@prisma/client';
import User from './decorators/employees.decorator';
import { JWTPayload } from 'src/dtos/auth.dto';



@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) { }

  @Serialize(ProfileDto)
  @Roles(Role.SUPERADMIN, Role.HR, Role.EMPLOYEE)
  @Get('/me')
  findOne(@User() user: JWTPayload) {
    if (!user) throw new UnauthorizedException('Not Authorized')
    return this.employeesService.findOne(user.id);
  }

  @Serialize(EmployeeResponseDto)
  @Roles(Role.SUPERADMIN, Role.HR)
  @Get('/:status')
  findAll(@Param('status') status: string) {
    const statusPattern = /^(active|inactive)$/
    if (!statusPattern.test(status)) throw new HttpException('URL not valid', 400)
    return this.employeesService.findAll(status);
  }

  @Serialize(EmployeeResponseDto)
  @Roles(Role.EMPLOYEE, Role.HR, Role.SUPERADMIN)
  @Patch('update')
  update(@Body() updateEmployeeDto: UpdateEmployeeDto, @User() user: JWTPayload) {
    if (!user) throw new UnauthorizedException('You are not authorised')
    return this.employeesService.update(user, updateEmployeeDto);
  }

  @Serialize(EmployeeResponseDto)
  @Roles(Role.HR, Role.SUPERADMIN)
  @Patch('/:action/:id')
  activateEmployee(@Param('id') id: string, @Param('action') action: string) {
    const statusPattern = /^(activate|deactivate)$/
    if (!statusPattern.test(action)) throw new HttpException('URL not valid', 400)
    return this.employeesService.activateEmployee(id, action)
  }
}
