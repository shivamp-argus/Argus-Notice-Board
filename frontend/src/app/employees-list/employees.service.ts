import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employees } from './employees-list.component';
import { EmpTeamRequest, Team } from '../team/emp-team/emp-team.component';
import { AllTeamResponse } from '../team/teams-list/teams-list.component';
import { Role } from '../app.component';

export interface UpdateEmployee {
  emp_name: string
  emp_email: string
  role: Role
  isActive: boolean
}

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private readonly http: HttpClient) { }
  token = sessionStorage.getItem('token')
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`,
  })

  getAllEmployees(status: string) {
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
  updateProfile(updateEmployee: UpdateEmployee) {
    return this.http.patch<Employees>('http://localhost:3000/employees/update', updateEmployee, { headers: this.httpHeaders })
  }
}
