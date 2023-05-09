import { Component, OnInit } from '@angular/core';
import { NoticesService } from './notices.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export type Notices = {
  id: string
  notice_title: string
  notice_body: string
  issuer_id: string
  category_id: string
  published: boolean
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
    private readonly authService: AuthService
  ) { }

  status: string = ''
  toggleStatus: boolean = true
  notices: Notices[] = []
  filteredNotices: Notices[] = []
  selectedNoticeId: string = ''
  role: string = ''
  expectedRole: string[] = []


  ngOnInit(): void {
    this.getAllNotices()

  }

  getAllNotices() {
    // if (this.expectedRole.length === 0) {
    //   this.route.data.subscribe((data) => {
    //     console.log('expectedRole', data['expectedRole']);
    //     this.role = data['expectedRole']
    //     console.log('role', this.role);

    //     // data['expectedRole'].map((el: string) => this.expectedRole.push(el))
    //   })
    // }
    // console.log(this.expectedRole);
    this.authService.me().subscribe(employee => {
      // console.log(employee);

      this.role = employee.role.toUpperCase()
      if (this.role === 'SUPERADMIN') {
        this.noticesService.getAllNoticesBySuperadmin().subscribe((data) => {
          this.notices = data
          this.changeStatus('published')
        })
      } else {
        this.noticesService.getAllNoticesByHR().subscribe(data => {
          this.notices = data
          this.changeStatus('published')
        })
      }
    })





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
      // this.employees.filter(employee=>)
      console.log(data);
      this.getAllNotices()

    })
  }
}
