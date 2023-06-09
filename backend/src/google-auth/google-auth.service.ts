import { Injectable, Req } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { VerifyCallback, Strategy } from 'passport-google-oauth20'



@Injectable()
export class GoogleAuthService extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env['CLIENT_ID'],
            clientSecret: process.env['CLIENT_SECRET'],
            callbackURL: 'http://localhost:3000/google-auth/auth/google/callback',
            scope: ['email', 'profile'],
            prompt: 'select_account'
        })
    }
    async validate(accessToken: string, refereshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        // console.log(profile)
        // console.log(openid)
        const { name, emails } = profile
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            accessToken,
        }
        console.log(user)
        done(null, user)

    }
    googleLogin(req) {

        if (!req.user) {
            return 'No user with registered email found'
        }
        // const { accessToken } = req.user
        // console.log(req)
        // const session = req.session
        // session.accessToken = accessToken

        return {
            message: 'User info from google',
            user: req.user
        }
    }
    async googleLogout(req) {
        console.log(req)
        await req.logout()
    }

}
