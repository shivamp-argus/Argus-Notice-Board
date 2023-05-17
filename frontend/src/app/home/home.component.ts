import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../employees-list/employees.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private readonly authService: AuthService) { }

  role: string = ''

  ngOnInit(): void {
    this.authService.me().subscribe(employee => {
      this.role = employee.role.toUpperCase()
    })
  }
}
