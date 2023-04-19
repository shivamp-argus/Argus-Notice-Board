// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { GoogleAuthService } from 'src/google-auth/google-auth.service';

// @Injectable()
// export class AuthMiddleware implements NestMiddleware {
//     constructor(private readonly googleAuthService: GoogleAuthService) { }

//     async use(req: Request, res: Response, next: NextFunction) {
//         // check if user is authenticated and store access token in session
//         // if (userAuthenticated) {
//         //     req.session.accessToken = userAccessToken;
//         // }

//         // logout route
//         if (req.path === '/auth/google/logout') {
//             await this.googleAuthService.logout(req.session.accessToken);
//             req.session.destroy();
//             return res.redirect('/');
//         }
//         next();
//     }
// }