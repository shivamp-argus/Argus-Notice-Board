import { Component, DoCheck, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';

export type User = {
  email: string,
  name: string,
  id: string,
  role: string,
  token: string

}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  constructor(private readonly authService: AuthService, private readonly router: Router, private readonly route: ActivatedRoute) { }

  mode: string = '';
  error: string = '';
  currentPath: string = '';

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.mode = params["mode"]
    })
    // this.switchLink()
    // console.log(this.currentPath);
  }


  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  signupForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })
  user: User = {
    email: '',
    name: '',
    id: '',
    role: '',
    token: ''
  }
  setUser(payload: any) {
    this.user = {
      email: payload.employee.emp_email,
      name: payload.employee.emp_name,
      id: payload.employee.id,
      role: payload.employee.role,
      token: payload.token

    }
  }
  login() {
    try {
      const employee = {
        email: this.loginForm.value.email as string,
        password: this.loginForm.value.password as string
      }
      this.authService.login(employee).subscribe(data => {
        this.setUser(data)
        localStorage.setItem('token', this.user.token)
        this.router.navigate(['/home'])
      },
        (error) => {
          this.error = error.error.message
          console.log(this.error);
        })
    } catch (e) {
      throw new Error("Not authorised")
    }
  }
  signup() {
    try {
      const employee = {
        emp_name: this.signupForm.value.name as string,
        emp_email: this.signupForm.value.email as string,
        password: this.signupForm.value.password as string
      }
      this.authService.signup(employee).subscribe(data => {
        console.log('User created');

        this.router.navigate(['/auth/login'])

      },
        (error) => {
          this.error = error.error.message
          console.log(this.error);
        })
    } catch (e) {
      throw new Error('Cannot Signup')
    }
  }
  switchButtonText() {
    if (this.mode === 'login') {
      return 'Login'
    } else {
      return 'Sign-Up'
    }
  }
  switchLinkText() {
    if (this.mode === 'login') {
      return 'Sign-Up'
    } else {
      return 'Login'
    }
  }
  switchLink() {
    this.route.url.subscribe(url => {
      const path = this.mode === 'login' ? 'signup' : 'login'
      this.currentPath = url[0].path + '/' + path
    })
    return this.currentPath
  }
}
