import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class CreateEmployeeDto {
    // @IsString()
    // emp_id: string

    @IsString()
    emp_name: string

    @IsEmail()
    emp_email: string

    @IsString()
    @IsStrongPassword()
    password: string

    @IsString()
    role: string


}
