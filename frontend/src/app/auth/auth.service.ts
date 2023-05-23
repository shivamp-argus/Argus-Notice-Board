import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Role } from '../app.component';

export interface ProfileResponse {
  user: {
    id: string,
    emp_name: string,
    emp_email: string,
    isActive: boolean,
    role: Role,
    Employee_Team: {
      Team: {
        team_name: string
      }
    }[]
  },
  notices: {
    notice_title: string
  }[]
}
export interface LoginResponse {
  employee: {
    id: string,
    emp_name: string,
    emp_email: string,
    isActive: boolean,
    role: string
  },
  token: string
}
export interface LoginInterface {
  email: string,
  password: string

}
export interface SignupInterface {
  emp_name: string,
  emp_email: string,
  password: string,
  role?: string

}
export interface SignupResponse {
  id: string,
  emp_name: string,
  emp_email: string,
  isActive: boolean,
  role: Role
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient) { }



  login(data: LoginInterface) {
    return this.http.post<LoginResponse>('http://localhost:3000/auth/login', data)
  }
  signup(data: SignupInterface) {
    return this.http.post<SignupResponse>('http://localhost:3000/auth/signup', data)
  }
  me() {
    const token = sessionStorage.getItem('token')
    return this.http.get<ProfileResponse>('http://localhost:3000/employees/me', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    })
  }
}
