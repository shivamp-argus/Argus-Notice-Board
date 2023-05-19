import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) { }
  // expectedRoles = {
  //   'employees': ['HR', 'Emp']

  // };

  role: string = ''
  expectedRole: string[] = []
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    const token = sessionStorage.getItem('token')
    if (!token) {
      this.router.navigate([''])
      this.toastr.error('You are not authorised', 'Unauthorised Error', { timeOut: 1500 })
      return false
    }

    const payload = JSON.parse(atob(token.split('.')[1]))
    this.role = payload.role
    this.expectedRole = route.data['expectedRole']

    if (!this.expectedRole.includes(this.role.toUpperCase())) {
      this.router.navigate([''])
      this.toastr.error('You are not authorised', 'Unauthorised Error', { timeOut: 1500 })
      return false
    }
    return true

  }

}
