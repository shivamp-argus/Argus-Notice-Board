import { PartialType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';



export class CreateNoticeDto {
    @IsString()
    @IsNotEmpty()
    notice_body: string

    @IsString()
    @IsNotEmpty()
    issuer_id: string

    @IsString()
    @IsNotEmpty()
    category: string

}
export class UpdateNoticeDto extends PartialType(CreateNoticeDto) {
    issuer_id: string
    // category?: string;


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

    @Expose()
    published: boolean
}

export class CreateNoticeTeamDto {
    @IsString()
    @IsNotEmpty()
    notice_id: string

    @IsString()
    @IsNotEmpty()
    team_id: string

}