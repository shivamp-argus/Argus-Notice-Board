import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
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
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly toastr: ToastrService
  ) { }

  employees: Employees[] = []
  teams: Team[] = []
  role: string = ''

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
    this.authService.me().subscribe(employee => this.role = employee.role)
  }



  createEmpTeam() {
    const empTeam: EmpTeamRequest = {
      emp_id: this.createEmpTeamForm.value.employee as string,
      team_id: this.createEmpTeamForm.value.team as string
    }
    if (!this.createEmpTeamForm.valid) this.toastr.error('Enter valid details', 'Invalid Details', { timeOut: 1500 })
    else {
      this.employeesService.createEmpTeam(empTeam).subscribe(data => {
        this.router.navigate(['/admin/teams'])
        this.toastr.success('Employee added to team sucessfully', 'Employee Added', { timeOut: 1500 })
      },
        (error) => {
          const errorMessage = JSON.parse(error.error)
          this.toastr.error(errorMessage.message, errorMessage.error, { timeOut: 1500 })
        }
      )
    }


  }
}
