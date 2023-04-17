import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { VerifyCallback, Strategy } from 'passport-google-oauth20'

@Injectable()
export class GoogleAuthService extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env['CLIENT_ID'],
            clientSecret: process.env['CLIENT_SECRET'],
            callbackURL: 'http://localhost:3000/google-auth/auth/google/callback',
            scope: ['email', 'profile', 'openid', 'https://www.googleapis.com/auth/contacts']
        })
    }
    async validate(accessToken: string, refereshToken: string, profile: any, done: VerifyCallback, openid: any): Promise<any> {
        console.log(profile)
        console.log(openid)
        const { name, emails } = profile
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            accessToken,
            refereshToken,
            openid
        }
        done(null, user)
    }

    googleLogin(req) {
        if (!req.user) {
            return 'No user with registered email found'
        }
        return {
            message: 'User info from google',
            user: req.user
        }
    }
    googleLogout(req) {
        if (!req.user) {
            return 'No user logged in'
        }
        return req.logout()
    }
}
