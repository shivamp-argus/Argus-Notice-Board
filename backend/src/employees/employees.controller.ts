import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../dtos/create-employee.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { EmployeeDto } from '../dtos/employee.dto';





@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) { }

  @Post()
  @Serialize(EmployeeDto)
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  @Serialize(EmployeeDto)
  findAll() {
    return this.employeesService.findAll();
  }




  @Get('/:id')
  @Serialize(EmployeeDto)
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(id);
  }

  @Patch(':id')
  @Serialize(EmployeeDto)
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  @Serialize(EmployeeDto)
  remove(@Param('id') id: string) {
    return this.employeesService.remove(id);
  }




}
