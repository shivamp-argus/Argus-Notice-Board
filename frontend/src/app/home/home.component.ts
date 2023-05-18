import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../employees-list/employees.service';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Role, getRole } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly toastr: ToastrService
  ) { }

  role: Role = Role.EMPLOYEE

  ngOnInit(): void {
    this.role = getRole()
  }
}
