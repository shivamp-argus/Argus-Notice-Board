import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Team } from '../emp-team/emp-team.component';
import { TeamsService } from '../teams.service';
import { AllTeamResponse } from '../teams-list/teams-list.component';
import { EmployeesService } from 'src/app/employees-list/employees.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export type CreateTeamRequest = {
  team_name: string
}
@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {

  constructor(
    private readonly teamsService: TeamsService,
    private readonly employeesService: EmployeesService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) { }


  teams: AllTeamResponse[] = []
  createTeamForm = new FormGroup({
    name: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.employeesService.getTeamAllData().subscribe(data => {
      this.teams = data
    })

  }

  createTeam() {
    const createTeamRequest: CreateTeamRequest = {
      team_name: this.createTeamForm.value.name as string
    }
    this.teamsService.createTeam(createTeamRequest).subscribe(data => {
      this.toastr.success('Team created successfully', 'Team created', { timeOut: 1500 })
      this.createTeamForm.reset()
      this.router.navigate(['/admin/teams'])
    }, (error) => {
      this.toastr.error(error.error.message, error.error.error, { timeOut: 1500 })
    }
    )
  }
}
