import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(private readonly route: ActivatedRoute, private readonly authService: AuthService) { }
  isValidRole: boolean = false
  role: string = 'SUPERADMIN'
  isSuperadmin: boolean = false
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.authService.me().subscribe(employee => {
        this.role = employee.role.toUpperCase()

        // if (data['expectedRole']?.includes(this.role)) {
        //   this.isValidRole = true
        // }
        // console.log(this.role);
        // console.log(data['expectedRole']);
        // console.log(this.isValidRole);
      })


    })

  }
}
