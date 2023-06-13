import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export enum Role {
  'SUPERADMIN',
  'HR',
  'EMPLOYEE'
}

export function getRole(): Role {
  const token = sessionStorage.getItem('token') as string
  const payload = JSON.parse(atob(token.split('.')[1]))
  return payload.role.toUpperCase()
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  constructor(private readonly route: ActivatedRoute) { }
  ngOnInit(): void {
    console.log(this.route.snapshot.routeConfig);
  }
}
