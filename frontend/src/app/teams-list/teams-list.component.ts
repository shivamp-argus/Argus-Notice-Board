import { Component } from '@angular/core';

import { EmployeesService } from '../employees-list/employees.service';

export type Employee = {
  Employee: { emp_name: string }
}
export type Notice = {
  Notice: { notice_title: string }
}
export type AllTeamResponse = {
  id: string
  team_name: string
  Employee: { emp_name: string }
  Employee_Team: Employee[]
  Notice_Team: Notice[]


}

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.css']
})
export class TeamsListComponent {
  constructor(private readonly employeesService: EmployeesService) { }
  teams: AllTeamResponse[] = []

  ngOnInit(): void {
    this.employeesService.getTeamAllData().subscribe(data => {
      this.teams = data
    })

  }
}
