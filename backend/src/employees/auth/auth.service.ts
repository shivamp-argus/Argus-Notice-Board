import { ConflictException, Injectable, NotAcceptableException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';
import { AuthResponseDto, JWTPayload, RegisterSuperAdmin } from 'src/dtos/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeDto, EmployeeResponseDto } from 'src/dtos/employee.dto';


@Injectable()
export class AuthService {

  constructor(private readonly prisma: PrismaService) { }

  async registerSuperAdmin({ emp_email, password, ...rest }: RegisterSuperAdmin) {
    let user = await this.prisma.employee.findFirst({ where: { role: Role.SUPERADMIN } })
    if (user) throw new ConflictException('Superadmin already exists')

    user = await this.prisma.employee.findUnique({ where: { emp_email } })
    if (user) throw new ConflictException('Email already in use')

    const hashedPassword: string = await bcrypt.hash(password, 10)

    user = await this.prisma.employee.create({ data: { ...rest, emp_email, password: hashedPassword, role: Role.SUPERADMIN } })
    return new AuthResponseDto({
      employee: new EmployeeResponseDto(user),
      token: this.generateAuthToken({ id: user.id })
    })

  }

  async signup(createEmployeeDto: CreateEmployeeDto) {
    const { emp_email, password } = createEmployeeDto
    if (createEmployeeDto?.role === "SUPERADMIN") throw new NotAcceptableException()
    if (emp_email.match(/^(superadmin@)(.)*$/)) throw new NotAcceptableException();

    const user = await this.prisma.employee.findUnique({ where: { emp_email } })
    if (user) throw new ConflictException("User already exists")

    const hashedPassword: string = await bcrypt.hash(password, 10)
    const employee = await this.prisma.employee.create({
      data: { ...createEmployeeDto, password: hashedPassword }
    });

    return new AuthResponseDto({
      employee: new EmployeeResponseDto(employee),
      token: this.generateAuthToken({ id: employee.id })
    })
  }

  private generateAuthToken(payload: JWTPayload) {
    return jwt.sign(payload, process.env['JWT_SECRET'], { expiresIn: 3600 })
  }


}
