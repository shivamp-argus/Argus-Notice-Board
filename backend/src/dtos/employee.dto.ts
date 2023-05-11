import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

import { Role } from "@prisma/client";
import { Expose } from 'class-transformer';

export class CreateEmployeeDto {

    @IsNotEmpty()
    @IsString()
    emp_name: string

    @IsNotEmpty()
    @IsEmail()
    emp_email: string

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password: string


    @IsString()
    role: Role

    constructor(user: CreateEmployeeDto) {
        Object.assign(this, user);
    }

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

    @Expose()
    isActive: boolean

    constructor(user: EmployeeResponseDto) {
        Object.assign(this, user);
    }

}

export class CreateEmpTeamDto {

    emp_id: string

    @IsString()
    team_id: string

    addedBy: string

}
export type EmpTeamRequestDto = {
    emp_id: string
    team_id: string
}