import { Component, OnInit } from '@angular/core';
import { NoticesService } from '../notices/notices.service';

export type Notice_Team = {
  id: string
  Notice: {
    notice_title: string
  }
  notice_id: string
  team_id: string
}

export type EmpNotice = {
  id: string
  team_name: string
  Employee: {
    emp_name: string
  }
  Notice_Team: Notice_Team[]
}

@Component({
  selector: 'app-employees-notice',
  templateUrl: './employees-notice.component.html',
  styleUrls: ['./employees-notice.component.css']
})
export class EmployeesNoticeComponent implements OnInit {
  constructor(private readonly noticesService: NoticesService) { }

  empNotice: EmpNotice[] = []

  ngOnInit(): void {
    this.getAllNoticeByEmployee()

  }

  getAllNoticeByEmployee() {
    this.noticesService.getAllNoticesByEmployee().subscribe(data => {
      this.empNotice = data

    }
    )
  }

}
