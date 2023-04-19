import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString, IsStrongPassword } from "class-validator";

import { Role } from "@prisma/client";

export class CreateEmployeeDto {

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



export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) { }

