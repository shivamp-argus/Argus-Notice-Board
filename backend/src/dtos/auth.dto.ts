import { IsString, IsEmail, IsStrongPassword } from "class-validator"
import { Role } from "@prisma/client"
import { EmployeeResponseDto } from "./employee.dto"


export class RegisterSuperAdmin {
    @IsString()
    emp_name: string

    @IsEmail()
    emp_email: string

    @IsString()
    @IsStrongPassword()
    password: string

    @IsString()
    role: Role
}
export class AuthResponseDto {
    employee: EmployeeResponseDto
    token: string

    constructor(obj: AuthResponseDto) {
        Object.assign(this, obj);
    }
}

export type JWTPayload = {
    id: string
    role: Role
}

export type LoginRequestDto = {
    email: string,
    password: string
}

