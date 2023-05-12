import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto, RegisterSuperAdmin } from 'src/dtos/auth.dto';
import { CreateEmployeeDto, EmployeeRequestDto } from 'src/dtos/employee.dto';
import { validate } from 'class-validator';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register/superadmin')
  registerSuperAdmin(@Body() registerSuperAdmin: RegisterSuperAdmin) {
    return this.authService.registerSuperAdmin(registerSuperAdmin);
  }

  @Post('signup')
  async signup(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.authService.signup(createEmployeeDto)
  }

  @Post('login')
  async login(@Body() loginRequestDto: LoginRequestDto) {
    return this.authService.login(loginRequestDto)
  }


}
