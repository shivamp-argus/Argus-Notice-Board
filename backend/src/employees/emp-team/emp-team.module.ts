import { Module } from '@nestjs/common';
import { EmpTeamController } from './emp-team.controller';
import { EmpTeamService } from './emp-team.service';

@Module({
    controllers: [EmpTeamController],
    providers: [EmpTeamService]

})
export class EmpTeamModule { }
