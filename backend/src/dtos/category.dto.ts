import { Exclude } from "class-transformer";
import { IS_ALPHA, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    category: string

}

export class CategoryDto {

    @Exclude()
    id: string

    @IsString()
    category: string

}