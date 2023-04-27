import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken'
import { JWTPayload } from 'src/dtos/auth.dto';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService, private readonly reflector: Reflector) { }
  async canActivate(context: ExecutionContext) {

    const roles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass()
    ]);
    // console.log(roles)
    if (roles?.length) {
      const req = context.switchToHttp().getRequest();
      const token = req.headers?.authorization?.replace('Bearer ', '');
      if (!token) return false;

      try {
        const decoded = this.verifyToken(token);

        const user = await this.prisma.employee.findUnique({ where: { id: decoded.id } });
        if (!user) return false;

        if (!roles.includes(user.role)) return false;

        req.user = user
        return true;
      } catch (err) { return false; };
    }
    return true;

  }
  private verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;
  }
}
