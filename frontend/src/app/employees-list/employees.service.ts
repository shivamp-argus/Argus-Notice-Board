import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Employees } from './employees-list.component';
import { EmpTeamRequest, Team } from '../team/emp-team/emp-team.component';
import { AllTeamResponse } from '../team/teams-list/teams-list.component';


@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  // token: string;

  constructor(private readonly http: HttpClient) {
    // console.log('Emp Service Init');
  }
  token = sessionStorage.getItem('token')
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`,
  })

  getToken() {
    this.token = sessionStorage.getItem('token')
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`,
    })
  }


  getAllEmployees(status: string) {
    // this.getToken()
    // console.log(this.token);
    return this.http.get<Employees[]>(`http://localhost:3000/employees/${status}`, {
      headers: this.httpHeaders
    })
  }

  toggleEmployeeStatus(id: string, toggleStatus: string) {
    return this.http.patch(`http://localhost:3000/employees/${toggleStatus}/${id}`, null, {
      headers: this.httpHeaders,
      responseType: 'text'
    })
  }
  getAllTeams() {
    return this.http.get<Team[]>('http://localhost:3000/team', { headers: this.httpHeaders })
  }
  createEmpTeam(empTeamRequest: EmpTeamRequest) {
    return this.http.post('http://localhost:3000/emp-team', [empTeamRequest], { headers: this.httpHeaders, responseType: 'text' })
  }

  getTeamAllData() {
    return this.http.get<AllTeamResponse[]>('http://localhost:3000/team', { headers: this.httpHeaders })
  }
}
