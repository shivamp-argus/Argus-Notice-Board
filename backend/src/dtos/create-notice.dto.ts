import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { EmployeeDto } from './employee.dto';
import { CategoryDto } from './create-category.dto';

export class CreateNoticeDto {
    @IsString()
    notice_body: string

    @IsString()
    issuer_id: string

    @IsString()
    category_id: string

    issuer: EmployeeDto

    category: CategoryDto
}
export class UpdateNoticeDto extends PartialType(CreateNoticeDto) {
    // @IsString()
    // notice_body: string

    // @IsString()
    // issuer_id: string

    // @IsString()
    // category_id: string
}