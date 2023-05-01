import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService, LoginInterface } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  constructor(private readonly authService: AuthService) { }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  login() {
    try {
      const employee = {
        email: this.loginForm.value.email as string,
        password: this.loginForm.value.password as string
      }
      this.authService.login(employee).subscribe(data => {
        console.log(data);
      })

    } catch (e) {
      throw new Error()
    }




  }
}
