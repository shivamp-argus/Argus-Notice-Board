import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Team } from '../emp-team/emp-team.component';
import { Notices } from 'src/app/notices/notices.component';
import { EmployeesService } from 'src/app/employees-list/employees.service';
import { NoticesService } from 'src/app/notices/notices.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

export type NoticeTeamRequest = {
  team_id: string
  notice_id: string
}

@Component({
  selector: 'app-emp-notice',
  templateUrl: './emp-notice.component.html',
  styleUrls: ['./emp-notice.component.css']
})
export class EmpNoticeComponent implements OnInit {

  constructor(
    private readonly employeesService: EmployeesService,
    private readonly noticesService: NoticesService,
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }
  teams: Team[] = []
  notices: Notices[] = []
  role: string = ''

  createNoticeTeamForm = new FormGroup({
    team: new FormControl('', Validators.required),
    notice: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.employeesService.getAllTeams().subscribe(teams => this.teams = teams)
    this.noticesService.getAllNoticesByHR().subscribe(notices => this.notices = notices)
    this.authService.me().subscribe(employee => this.role = employee.role)
  }

  createNoticeTeam() {

    const noticeTeam: NoticeTeamRequest = {
      notice_id: this.createNoticeTeamForm.value.notice as string,
      team_id: this.createNoticeTeamForm.value.team as string
    }
    this.noticesService.createNoticeTeam(noticeTeam).subscribe(data => {
      console.log(data);
      if (this.role === 'SUPERADMIN') {
        this.router.navigate(['/admin/teams'])
      } else {
        this.router.navigate(['/employees/teams'])
      }
    })
  }
}
