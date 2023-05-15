import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticesService } from '../notices/notices.service';
import { Notices } from '../notices/notices.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-notice',
  templateUrl: './view-notice.component.html',
  styleUrls: ['./view-notice.component.css']
})
export class ViewNoticeComponent implements OnInit {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly noticeService: NoticesService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) { }

  noticeTitle: string = ''
  notice: Notices = {
    id: '',
    notice_title: '',
    notice_body: '',
    issuer_id: '',
    category_id: '',
    published: true,
    Employee: {
      emp_name: ''
    },
    category: {
      category: ''
    },
  }
  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.noticeTitle = param['notice-title']
      this.viewNoticeByEmployee(this.noticeTitle)
    })

  }
  viewNoticeByEmployee(title: string) {
    this.noticeService.viewNoticeByEmployee(title).subscribe(data => {
      this.notice = data
    },
      error => {
        this.toastr.error(error.error.message, error.error.error, { timeOut: 1500 })
        this.router.navigate(['/employees/notices'])
      }
    )
  }
}
