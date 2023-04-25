import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmpTeamController } from './emp-team/emp-team.controller';
import { EmpTeamService } from './emp-team/emp-team.service';
import { EmpTeamModule } from './emp-team/emp-team.module';
import { AuthModule } from './auth/auth.module';




@Module({
  controllers: [EmployeesController, EmpTeamController],
  providers: [EmployeesService, EmpTeamService],
  imports: [EmpTeamModule, AuthModule],
})
export class EmployeesModule { }
