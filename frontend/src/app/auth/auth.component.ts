import { Component, DoCheck, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';

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
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: ToastrService
  ) { }

  mode: string = '';
  error: string = '';
  currentPath: string = '';

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.mode = params["mode"]
    })
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  signupForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    role: new FormControl('', [Validators.required, Validators.minLength(1)])
  })
  Role: string[] = ['HR', 'EMPLOYEE']
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
      if (!this.loginForm.valid) this.toast.error('Enter valid data', 'Invalid Data', { timeOut: 1500 })
      else {
        this.authService.login(employee).subscribe(data => {
          this.setUser(data)
          sessionStorage.setItem('token', this.user.token)

          if (data.employee.role.toUpperCase() === 'EMPLOYEE') {
            this.router.navigate(['/employees/notices'])
            this.toast.success('Logged in successfully', 'Login Successfull', { timeOut: 1500 })
          }
          else {
            this.router.navigate(['/admin/employees'])
            this.toast.success('Logged in successfully', 'Login Successfull', { timeOut: 1500 })
          }

        },
          (error) => {
            this.error = error.error.message
            this.toast.error(this.error, error.error.error, { timeOut: 1500 })
          })
      }

    } catch (e) {
      throw new Error("Not authorised")
    }
  }
  signup() {
    try {
      const employee = {
        emp_name: this.signupForm.value.name as string,
        emp_email: this.signupForm.value.email as string,
        password: this.signupForm.value.password as string,
        role: this.signupForm.value.role?.toUpperCase() as string
      }

      if (!this.signupForm.valid) {
        this.toast.error('Form is invalid', 'Invalid Form', { timeOut: 1500 })
      } else {
        this.authService.signup(employee).subscribe(data => {
          this.router.navigate(['/auth/login'])
          this.toast.success('Signed-up successfully', 'Signup Successfull', { timeOut: 1500 })
          this.signupForm.reset()
        },
          (error) => {
            if (error.status !== 0) {
              console.log(error);

              this.error = error.error.message
              this.toast.error(this.error, '', { timeOut: 1500 })
            }
          })
      }

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
