import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { GoogleAuthController } from './google-auth/google-auth.controller';

import { AppService } from './app.service';
import { GoogleAuthService } from './google-auth/google-auth.service';
import { PrismaService } from './prisma/prisma.service';
import { NoticeModule } from './notice/notice.module';
import { EmployeesModule } from './employees/employees.module';
import { CategoriesController } from './notice/categories/categories.controller';
import { CategoriesService } from './notice/categories/categories.service';



@Module({
  imports: [ConfigModule.forRoot(), NoticeModule, EmployeesModule],
  controllers: [AppController, GoogleAuthController, CategoriesController],
  providers: [AppService, GoogleAuthService, PrismaService, CategoriesService],
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
