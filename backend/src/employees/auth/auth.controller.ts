import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, ParseEnumPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterSuperAdmin } from 'src/dtos/auth.dto';
import { Role } from '@prisma/client';
import { CreateEmployeeDto } from 'src/dtos/employee.dto';
import { auth } from 'google-auth-library';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register/superadmin')
  registerSuperAdmin(@Body() registerSuperAdmin: RegisterSuperAdmin) {
    if (registerSuperAdmin.password !== process.env['SUPERADMIN_PASSWORD'])
      throw new HttpException('Invalid Credentials', 400)
    return this.authService.registerSuperAdmin(registerSuperAdmin);
  }

  @Post('signup')
  // @Param('role', new ParseEnumPipe(Role)) role: Role,
  async signup(@Body() createEmployeeDto: CreateEmployeeDto) {

    return this.authService.signup(createEmployeeDto)
  }



}
