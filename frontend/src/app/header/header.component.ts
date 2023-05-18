import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { getRole } from '../app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly toastr: ToastrService
  ) { }
  role: string = ''

  ngOnInit(): void {
    // this.authService.me().subscribe(
    //   employee => this.role = employee.role.toUpperCase(),
    //   error => this.toastr.error(error.error.message, error.error.error, { timeOut: 1500 })

    // )
    this.role = getRole()
  }

}
