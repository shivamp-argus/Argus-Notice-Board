import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employees } from 'src/app/employees-list/employees-list.component';
import { EmployeesService } from 'src/app/employees-list/employees.service';

export type Team = {
  team_name: string,
  id: string,
  createdBy: string
}

export type EmpTeamRequest = {
  emp_id: string
  team_id: string
}

@Component({
  selector: 'app-emp-team',
  templateUrl: './emp-team.component.html',
  styleUrls: ['./emp-team.component.css']
})
export class EmpTeamComponent implements OnInit {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly router: Router
  ) { }

  employees: Employees[] = []
  teams: Team[] = []

  createEmpTeamForm = new FormGroup({
    employee: new FormControl('', Validators.required),
    team: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.employeesService.getAllEmployees('active').subscribe(employees => {
      this.employees = employees
    })
    this.employeesService.getAllTeams().subscribe(teams => {
      this.teams = teams
    })
  }



  createEmpTeam() {
    const empTeam: EmpTeamRequest = {
      emp_id: this.createEmpTeamForm.value.employee as string,
      team_id: this.createEmpTeamForm.value.team as string
    }
    this.employeesService.createEmpTeam(empTeam).subscribe(data => {
      console.log(data);
      this.router.navigate(['/employees/teams'])
    }
    )

  }
}