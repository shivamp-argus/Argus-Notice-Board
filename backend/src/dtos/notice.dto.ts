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

    published?: boolean

}
export class UpdateNoticeDto extends PartialType(CreateNoticeDto) {
    // id?: string
    // createdAt?: string | Date
    // updatedAt?: string | Date
    // published?: boolean
    // issuer_id?: string
    // category_id?: string
}


export type NoticeRequestDto = {
    notice_body: string
    category: string
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

    @IsString()
    @IsNotEmpty()
    addedBy: string

}
export type NoticeTeamRequestDto = {
    notice_id: string
    team_id: string
}