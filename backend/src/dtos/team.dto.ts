import { IsNotEmpty, IsString } from "class-validator"

export class CreateTeamDto {



    @IsString()
    @IsNotEmpty()
    team_name: string

    @IsString()
    createdBy: string

    constructor(team: CreateTeamDto) {
        Object.assign(this, team)
    }
}

export type TeamRequestDto = {

    team_name: string

}

export type TeamResponseDto = {
    id: string
    team_name: string
    createdBy: string
}

