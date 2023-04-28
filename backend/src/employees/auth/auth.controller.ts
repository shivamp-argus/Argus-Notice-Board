import { Controller, Post, Body, ParseEnumPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto, RegisterSuperAdmin } from 'src/dtos/auth.dto';
// import { Role } from '@prisma/client';
import { CreateEmployeeDto } from 'src/dtos/employee.dto';
// import { auth } from 'google-auth-library';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register/superadmin')
  registerSuperAdmin(@Body() registerSuperAdmin: RegisterSuperAdmin) {
    return this.authService.registerSuperAdmin(registerSuperAdmin);
  }

  @Post('signup')
  // @Param('role', new ParseEnumPipe(Role)) role: Role,
  async signup(@Body() createEmployeeDto: CreateEmployeeDto) {

    return this.authService.signup(createEmployeeDto)
  }

  @Post('login')
  async login(@Body() loginRequestDto: LoginRequestDto) {
    return this.authService.login(loginRequestDto)
  }


}