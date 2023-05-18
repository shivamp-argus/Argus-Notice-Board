import { Component } from '@angular/core';

export function getRole(): string {
  const token = sessionStorage.getItem('token') as string
  const payload = JSON.parse(atob(token.split('.')[1]))
  return payload.role.toUpperCase()
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
}
