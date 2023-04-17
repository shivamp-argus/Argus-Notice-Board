import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleAuthController } from './google-auth/google-auth.controller';
import { GoogleAuthService } from './google-auth/google-auth.service';

import { NoticeController } from './notice/notice.controller';
import { NoticeService } from './notice/notice.service';

@Module({

  controllers: [AppController, GoogleAuthController, NoticeController],
  providers: [AppService, GoogleAuthService, NoticeService],
})
export class AppModule { }
