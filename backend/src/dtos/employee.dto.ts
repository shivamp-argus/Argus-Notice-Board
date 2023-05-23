import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

import { Role } from "@prisma/client";
import { Expose } from 'class-transformer';
import { clearScreenDown } from 'readline';

export class CreateEmployeeDto {

    @IsNotEmpty()
    @IsString()
    emp_name: string

    @IsNotEmpty()
    @IsEmail()
    emp_email: string

    @IsNotEmpty()
    @IsString()
    password: string


    @IsString()
    role?: Role

    constructor(user: CreateEmployeeDto) {
        Object.assign(this, user);
    }

}

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
    isActive?: boolean
}

export class EmployeeRequestDto {
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

    constructor(user: EmployeeRequestDto) {
        Object.assign(this, user);
    }
}
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

    @IsNotEmpty()
    @IsString()
    emp_id: string

    @IsString()
    @IsNotEmpty()
    team_id: string

    @IsString()
    @IsNotEmpty()
    addedBy: string

    constructor(empteam: CreateEmpTeamDto) {
        Object.assign(this, empteam)
    }

}

export class ProfileDto {
    @Expose()
    user: {
        id: string
        emp_name: string
        emp_email: string
        isActive: boolean
        role: Role
        Employee_Team: {
            Team: {
                team_name: string,
            }
        }[]
    }

    @Expose()
    notices: {
        notice_title: string
    }[]


    constructor(profile: ProfileDto) {
        Object.assign(this, profile)
    }


}

export type EmpTeamRequestDto = {
    emp_id: string
    team_id: string
}