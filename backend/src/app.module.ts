import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { GoogleAuthController } from './google-auth/google-auth.controller';

import { AppService } from './app.service';
import { GoogleAuthService } from './google-auth/google-auth.service';
import { PrismaService } from './prisma/prisma.service';

import { NoticeModule } from './notice/notice.module';
import { EmployeesModule } from './employees/employees.module';


@Module({
  imports: [ConfigModule.forRoot(), NoticeModule, EmployeesModule],
  controllers: [AppController, GoogleAuthController],
  providers: [AppService, GoogleAuthService, PrismaService],
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
