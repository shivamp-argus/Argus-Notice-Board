import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Role, getRole } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) { }
  role: Role = Role.EMPLOYEE

  ngOnInit(): void {
    this.role = getRole()
  }

  logout() {
    sessionStorage.clear()
    this.router.navigate(['auth', 'login'])
    this.toastr.success('You are logged out successfully', 'Logout Successfull', { timeOut: 1500 })
  }
}
