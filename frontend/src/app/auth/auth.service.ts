import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


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

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient) { }

  login(data: LoginInterface) {
    return this.http.post<LoginResponse>('localhost:3000/auth/login', data)
  }

}
