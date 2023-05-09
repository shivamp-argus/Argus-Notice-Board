import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Team } from '../emp-team/emp-team.component';
import { TeamsService } from '../teams.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent {

  constructor(private readonly teamsService: TeamsService) { }

  teams: Team[] = []
  createTeamForm = new FormGroup({
    name: new FormControl('', Validators.required)
  })


  createTeam() {

  }
}
