import { Role } from "@prisma/client";
import { Expose } from "class-transformer";

export class EmployeeDto {
    @Expose()
    id: string

    @Expose()
    emp_name: string

    @Expose()
    emp_email: string

    @Expose()
    role: Role
}