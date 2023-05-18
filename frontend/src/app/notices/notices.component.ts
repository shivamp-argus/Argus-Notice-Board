import { Component, OnInit } from '@angular/core';
import { NoticesService } from './notices.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { getRole } from '../app.component';

export type Notices = {
  id: string
  notice_title: string
  notice_body: string
  issuer_id: string
  category_id: string
  published: boolean
  createdAt: Date
  Employee: {
    emp_name: string
  }
  category: {
    category: string
  }
}
@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css']
})
export class NoticesComponent implements OnInit {

  constructor(
    private readonly noticesService: NoticesService,
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly toastr: ToastrService
  ) { }

  status: string = ''
  toggleStatus: boolean = true
  notices: Notices[] = []
  filteredNotices: Notices[] = []
  selectedNoticeId: string = ''
  role = ''
  expectedRole: string[] = []


  ngOnInit(): void {
    this.getAllNotices()

  }

  getAllNotices() {
    this.role = getRole()
    if (this.role === 'SUPERADMIN') {
      this.noticesService.getAllNoticesBySuperadmin().subscribe((data) => {
        this.notices = data
        this.changeStatus('published')
      }, error => {
        this.toastr.error(error.error.message, error.error.error, { timeOut: 1500 })
      })
    } else {
      this.noticesService.getAllNoticesByHR().subscribe(data => {
        this.notices = data
        this.changeStatus('published')
      }, error => {
        this.toastr.error(error.error.message, error.error.error, { timeOut: 1500 })
      })
    }
  }
  changeStatus(selectedStatus: string) {
    this.status = selectedStatus
    this.toggleStatus = selectedStatus === 'published' ? true : false
    this.filteredNotices = this.notices.filter(notice => notice.published === this.toggleStatus)
  }

  changeStatusText() {
    if (this.status === 'published') {
      return 'Published'
    } else {
      return 'Pending'
    }
  }
  selectedNotice(id: string) {
    this.selectedNoticeId = id
  }
  toggleNoticeStatus(id: string) {
    this.noticesService.toggleNoticeStatus(id).subscribe(data => {
      this.getAllNotices()
      this.toastr.success('Notice published successfully', data, { timeOut: 1500 })
    }, error => {
      this.toastr.error(error)
    })
  }
}
