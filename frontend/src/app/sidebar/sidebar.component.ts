import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Role, getRole } from '../app.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly toastr: ToastrService
  ) { }

  isValidRole: boolean = false
  role: Role = Role.EMPLOYEE
  isSuperadmin: boolean = false

  ngOnInit(): void {
    this.role = getRole()
  }
}
