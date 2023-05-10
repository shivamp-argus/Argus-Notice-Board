import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private readonly authService: AuthService) { }
  role: string = ''

  ngOnInit(): void {
    this.authService.me().subscribe(employee => this.role = employee.role.toUpperCase())
  }

}
