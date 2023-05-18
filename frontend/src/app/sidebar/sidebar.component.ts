import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { getRole } from '../app.component';

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
  role: string = ''
  isSuperadmin: boolean = false

  ngOnInit(): void {
    // this.authService.me().subscribe(employee => {
    //   this.role = employee.role.toUpperCase()
    // }, error => {
    //   this.toastr.error(error.error.message, error.error.error, { timeOut: 1500 })
    // })
    this.role = getRole()
  }
}
