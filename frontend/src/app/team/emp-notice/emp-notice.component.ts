import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Team } from '../emp-team/emp-team.component';
import { Notices } from 'src/app/notices/notices.component';
import { EmployeesService } from 'src/app/employees-list/employees.service';
import { NoticesService } from 'src/app/notices/notices.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Role, getRole } from 'src/app/app.component';

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
    private readonly toastr: ToastrService
  ) { }
  teams: Team[] = []
  notices: Notices[] = []
  role: Role = Role.EMPLOYEE

  createNoticeTeamForm = new FormGroup({
    team: new FormControl('', Validators.required),
    notice: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.employeesService.getAllTeams().subscribe(teams => this.teams = teams)
    this.role = getRole()
    if (this.role.toString() === 'SUPERADMIN') {
      this.noticesService.getAllNoticesBySuperadmin()
        .subscribe(
          notices => this.notices = notices.filter(notice => notice.published === true),
          error => this.toastr.error('Notices cannot be fetched', 'Server Error', { timeOut: 1500 })
        )
    } else {
      this.noticesService.getAllNoticesByHR()
        .subscribe(
          notices => this.notices = notices,
          error => this.toastr.error('Notices cannot be fetched', 'Server Error', { timeOut: 1500 })
        )
    }
  }

  createNoticeTeam() {

    const noticeTeam: NoticeTeamRequest = {
      notice_id: this.createNoticeTeamForm.value.notice as string,
      team_id: this.createNoticeTeamForm.value.team as string
    }
    if (!this.createNoticeTeamForm.valid) this.toastr.error('Enter Valid details', 'Invalid Details', { timeOut: 1500 })
    else {
      this.noticesService.createNoticeTeam(noticeTeam).subscribe(data => {
        this.router.navigate(['admin', 'teams'])
        this.toastr.success(data, 'Notice Added', { timeOut: 1500 })
      }, error => {
        this.toastr.error(JSON.parse(error.error).message, JSON.parse(error.error).error, { timeOut: 1500 })
      })
    }
  }
}
