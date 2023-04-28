export class CreateTeamDto {
    id: string
    team_name: string
    createdBy: string

}

export type TeamRequestDto = {
    id: string
    team_name: string

}

export type TeamResponseDto = {
    id: string
    team_name: string
    createdBy: string
}

