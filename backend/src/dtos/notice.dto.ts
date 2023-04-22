import { PartialType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';



export class CreateNoticeDto {
    @IsString()
    notice_body: string

    @IsString()
    issuer_id: string

    @IsString()
    category: string



    // issuer: EmployeeDto

    // category: CategoryDto
}
export class UpdateNoticeDto extends PartialType(CreateNoticeDto) {
    issuer_id?: string
    category?: string;

}

export class NoticeResponseDto {
    @Expose()
    id: string

    @Expose()
    notice_body: string

    @Expose()
    issuer_id: string

    @Expose()
    category_id: string
}