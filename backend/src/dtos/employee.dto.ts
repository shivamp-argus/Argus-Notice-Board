import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString, IsStrongPassword } from "class-validator";

import { Role } from "@prisma/client";
import { Expose } from 'class-transformer';

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

export class EmployeeResponseDto {
    @Expose()
    id: string

    @Expose()
    emp_name: string

    @Expose()
    emp_email: string

    @Expose()
    role: Role

    constructor(user: EmployeeResponseDto) {
        Object.assign(this, user);
    }

}

export class CreateEmpTeamDto {

    emp_id: string

    @IsString()
    team_id: string


}