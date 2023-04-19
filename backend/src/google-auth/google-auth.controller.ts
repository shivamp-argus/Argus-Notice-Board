import { Controller, Get, UseGuards, Req } from '@nestjs/common';

import { GoogleAuthService } from './google-auth.service';
import { GoogleOAuthGuard } from './google-oauth.guard';


@Controller('google-auth')
export class GoogleAuthController {
    constructor(private googleAuthService: GoogleAuthService) { }

    @Get()
    @UseGuards(GoogleOAuthGuard)
    async googleAuth(@Req() req) { }

    @Get('auth/google/callback')
    @UseGuards(GoogleOAuthGuard)
    async googleAuthRedirect(@Req() req) {
        // console.log(req)
        return this.googleAuthService.googleLogin(req)
        // return req.logout()
    }

    @Get('auth/google/logout')
    async googleLogout(@Req() req) {
        // console.log('hiii', req)
        return this.googleAuthService.googleLogout(req)
        // return "hiii"
    }

}
