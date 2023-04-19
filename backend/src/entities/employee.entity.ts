import { Role } from "@prisma/client";
import { IsString, IsNumber, IsEmail, IsStrongPassword } from "class-validator";
export class Employee {

    @IsNumber()
    emp_id: number

    @IsString()
    emp_name: string

    @IsString()
    @IsEmail()
    emp_email: string

    @IsString()
    @IsStrongPassword()
    password: string

    @IsString()
    role: Role



}
