import { IsString } from "class-validator";

export class Notice {
    @IsString()
    id: string

    @IsString()
    notice_body: string

    @IsString()
    issuer_id: string

    @IsString()
    category_id: string

}
