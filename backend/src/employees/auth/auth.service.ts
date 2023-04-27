import { ConflictException, HttpException, Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';
import { AuthResponseDto, JWTPayload, LoginRequestDto, RegisterSuperAdmin } from 'src/dtos/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeDto, EmployeeResponseDto } from 'src/dtos/employee.dto';
import { ForbiddenException } from '@nestjs/common';


@Injectable()
export class AuthService {

  constructor(private readonly prisma: PrismaService) { }

  async registerSuperAdmin({ emp_email, password, ...rest }: RegisterSuperAdmin) {
    if (password !== process.env['SUPERADMIN_PASSWORD'])
      throw new HttpException('Invalid Credentials', 400)
    let user = await this.prisma.employee.findFirst({ where: { role: Role.SUPERADMIN } })
    if (user) throw new ConflictException('Superadmin already exists')

    user = await this.prisma.employee.findUnique({ where: { emp_email } })
    if (user) throw new ConflictException('Email already in use')

    const hashedPassword: string = await bcrypt.hash(password, 10)

    user = await this.prisma.employee.create({ data: { ...rest, emp_email, password: hashedPassword, role: Role.SUPERADMIN, isActive: true } })
    return new AuthResponseDto({
      employee: new EmployeeResponseDto(user),
      token: this.generateAuthToken({ id: user.id })
    })

  }

  async signup(createEmployeeDto: CreateEmployeeDto): Promise<EmployeeResponseDto> {
    const { emp_email, password } = createEmployeeDto
    if (createEmployeeDto?.role === "SUPERADMIN") throw new NotAcceptableException()
    if (emp_email.match(/^(superadmin@)(.)*$/)) throw new NotAcceptableException();

    const user = await this.prisma.employee.findUnique({ where: { emp_email } })
    if (user) throw new ConflictException("User already exists")

    const hashedPassword: string = await bcrypt.hash(password, 10)
    const employee = await this.prisma.employee.create({
      data: { ...createEmployeeDto, password: hashedPassword }
    });

    return new EmployeeResponseDto(employee)

  }

  async login(loginRequestDto: LoginRequestDto) {

    let employee = await this.prisma.employee.findUnique({ where: { emp_email: loginRequestDto.email } })
    if (!employee) throw new NotFoundException('Employee Not Found')

    if (!employee.isActive) throw new ForbiddenException('You are not allowed yet')

    let validUser = await bcrypt.compare(loginRequestDto.password, employee.password)
    if (!validUser) throw new UnauthorizedException('Password is not valid')

    return new AuthResponseDto({
      employee: new EmployeeResponseDto(employee),
      token: this.generateAuthToken({ id: employee.id })
    })


  }

  private generateAuthToken(payload: JWTPayload) {
    return jwt.sign(payload, process.env['JWT_SECRET'], { expiresIn: 3600 })
  }


}
