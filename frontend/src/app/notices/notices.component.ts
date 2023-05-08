import { Component, OnInit } from '@angular/core';
import { NoticesService } from './notices.service';

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

  constructor(private readonly noticesService: NoticesService) { }

  status: string = ''
  toggleStatus: boolean = true
  notices: Notices[] = []
  filteredNotices: Notices[] = []
  selectedNoticeId: string = ''

  ngOnInit(): void {
    this.getAllNotices()
  }

  getAllNotices() {
    this.noticesService.getAllNoticesBySuperadmin().subscribe((data) => {
      this.notices = data
      this.changeStatus('published')
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
