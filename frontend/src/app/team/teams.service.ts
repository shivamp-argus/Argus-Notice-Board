import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTeamRequest } from './create-team/create-team.component';
import { Team } from './emp-team/emp-team.component';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private readonly http: HttpClient) { }
  token = localStorage.getItem('token')
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  })

  createTeam(createTeamRequest: CreateTeamRequest) {
    return this.http.post<Team>('http://localhost:3000/team', createTeamRequest, { headers: this.httpHeaders })
  }

}
