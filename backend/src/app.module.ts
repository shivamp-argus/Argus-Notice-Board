import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { GoogleAuthController } from './google-auth/google-auth.controller';

import { AppService } from './app.service';
import { GoogleAuthService } from './google-auth/google-auth.service';

import { NoticeModule } from './notice/notice.module';
import { EmployeesModule } from './employees/employees.module';
import { CategoriesController } from './notice/categories/categories.controller';
import { CategoriesService } from './notice/categories/categories.service';
import { TeamModule } from './team/team.module';
import { PrismaModule } from './prisma/prisma.module';
import { EmpTeamModule } from './employees/emp-team/emp-team.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './employees/auth/guard/auth.guard';



@Module({
  imports: [ConfigModule.forRoot(), NoticeModule, EmployeesModule, TeamModule, PrismaModule, EmpTeamModule],
  controllers: [AppController, GoogleAuthController, CategoriesController],
  providers: [AppService, GoogleAuthService, CategoriesService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {
  constructor() { }
  serializeUser(user: any, done: Function) {
    done(null, user)
  }
  deserializeUser(payload: any, done: Function) {
    done(payload, null)
  }

}
