import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService, private readonly router: Router) { }
  // expectedRoles = {
  //   'employees': ['HR', 'Emp']

  // };

  role: string = ''
  expectedRole: string[] = []
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.authService.me().subscribe(data => {
      this.role = data.role
      this.expectedRole = route.data['expectedRole']

      if (!this.expectedRole.includes(this.role.toUpperCase())) {
        this.router.navigate([''])
        return false
      }
      return true
    })


    return true;
  }

}
