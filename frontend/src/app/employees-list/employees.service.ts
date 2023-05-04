import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employees } from './employees-list.component';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private readonly http: HttpClient) { }
  token = localStorage.getItem('token')
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json , text/html, text/plain',
    'Authorization': `Bearer ${this.token}`
  })
  // httpHeaders2 = new HttpHeaders({
  //   'Content-Type': 'text/plain',

  //   'Authorization': `Bearer ${this.token}`
  // })
  getAllEmployees(status: string) {
    return this.http.get<Employees[]>(`http://localhost:3000/employees/${status}`, {
      headers: this.httpHeaders
    })
  }
  toggleEmployeeStatus(id: string, toggleStatus: string) {
    console.log(id);
    console.log(this.token);

    return this.http.patch(`http://localhost:3000/employees/${toggleStatus}/${id}`, null, {
      headers: this.httpHeaders
    })
  }
}
