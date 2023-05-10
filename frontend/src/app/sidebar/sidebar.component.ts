import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(private readonly authService: AuthService) { }
  isValidRole: boolean = false
  role: string = ''
  isSuperadmin: boolean = false
  ngOnInit(): void {
    this.authService.me().subscribe(employee => {
      this.role = employee.role.toUpperCase()
    })
  }
}
