import { Exclude } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    category: string

    @IsString()
    @IsNotEmpty()
    createdBy: string

    // @IsBoolean()
    // isActive: boolean

}

export class CategoryRequestDto {
    category: string
}

export class CategoryDto {

    @Exclude()
    id: string

    @IsString()
    category: string

}