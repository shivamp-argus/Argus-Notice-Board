import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Role, getRole } from '../app.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toastr: ToastrService,
    private readonly authService: AuthService
  ) { }
  role: Role = Role.EMPLOYEE
  name: string = ''
  ngOnInit(): void {
    console.log(this.route.snapshot.routeConfig?.path);

    this.role = getRole()
    this.authService.me().subscribe(data => this.name = data.user.emp_name)
  }
  isActive(routePath: string) {
    return this.route.snapshot.routeConfig?.path === routePath
  }
  logout() {
    sessionStorage.clear()
    this.router.navigate(['auth', 'login'])
    this.toastr.success('You are logged out successfully', 'Logout Successfull', { timeOut: 1500 })
  }
}
