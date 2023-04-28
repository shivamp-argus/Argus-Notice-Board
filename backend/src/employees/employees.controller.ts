import { Controller, Get, Body, Patch, Param, Delete, HttpException, UnauthorizedException } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { UpdateEmployeeDto, EmployeeResponseDto } from '../dtos/employee.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { Roles } from './auth/decorators/auth.decorator';
import { Role } from '@prisma/client';
import User from './decorators/employees.decorator';
import { JWTPayload } from 'src/dtos/auth.dto';


@Serialize(EmployeeResponseDto)
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) { }


  @Roles(Role.SUPERADMIN, Role.HR, Role.Employee)
  @Get('/me')
  findOne(@User() user: JWTPayload) {
    console.log(user)
    if (!user) throw new UnauthorizedException('Not Authorized')
    return this.employeesService.findOne(user.id);
  }

  @Roles(Role.SUPERADMIN, Role.HR)
  @Get('/:status')
  findAll(@Param('status') status: string) {
    const statusPattern = /^(active|inactive)$/
    if (!statusPattern.test(status)) throw new HttpException('URL not valid', 400)
    return this.employeesService.findAll(status);
  }


  @Roles(Role.Employee, Role.HR, Role.SUPERADMIN)
  @Patch('update')
  update(@Body() updateEmployeeDto: UpdateEmployeeDto, @User() user: JWTPayload) {
    if (!user) throw new UnauthorizedException('You are not authorised')
    return this.employeesService.update(user, updateEmployeeDto);
  }
  // @Roles(Role.HR)
  // @Patch('/activate/:id')
  // remove(@Param('id') id: string) {
  //   return this.employeesService.remove(id);
  // }

  @Roles(Role.HR, Role.SUPERADMIN)
  @Patch('/:action/:id')
  activateEmployee(@Param('id') id: string, @Param('action') action: string) {
    const statusPattern = /^(activate|deactivate)$/
    if (!statusPattern.test(action)) throw new HttpException('URL not valid', 400)
    return this.employeesService.activateEmployee(id, action)
  }
}
