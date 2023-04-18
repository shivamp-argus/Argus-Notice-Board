import { Controller, Get, UseGuards, Req, Request } from '@nestjs/common';

import { GoogleAuthService } from './google-auth.service';
import { GoogleOAuthGuard } from './google-oauth.guard';

@Controller('google-auth')
export class GoogleAuthController {
    constructor(private googleAuthService: GoogleAuthService) { }

    @UseGuards(GoogleOAuthGuard)
    @Get()
    async googleAuth(@Req() req) { }

    @UseGuards(GoogleOAuthGuard)
    @Get('auth/google/callback')
    googleAuthRedirect(@Req() req) {
        return this.googleAuthService.googleLogin(req)
    }

    @Get('auth/google/logout')
    // @UseGuards(AuthGuard('google'))
    async googleLogout(@Request() req) {
        // console.log('hiii', req)
        return req.logout()


    }

}
