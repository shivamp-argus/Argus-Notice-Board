import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NoticesService } from '../notices/notices.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { getRole } from '../app.component';

export type Categories = {
  category: string
  createdBy: string
}
export type CategoriesResponse = {
  category: string
  Employee: {
    emp_name: string
  }
}
export type CreateNoticeRequest = {
  notice_title: string
  notice_body: string
  category: string
}
@Component({
  selector: 'app-create-notice',
  templateUrl: './create-notice.component.html',
  styleUrls: ['./create-notice.component.css']
})
export class CreateNoticeComponent implements OnInit {

  constructor(
    private readonly noticesService: NoticesService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly toastr: ToastrService
  ) { }

  categories: Categories[] = []
  role: string = ''
  createNoticeRequest: CreateNoticeRequest = {
    notice_title: '',
    notice_body: '',
    category: ''

  }

  createNoticeForm = new FormGroup({
    notice_title: new FormControl('', Validators.required),
    notice_body: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  })

  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      ['link'],
      ['clean'],
    ],
  }

  ngOnInit(): void {
    this.getAllCategory()
    // this.authService.me().subscribe(employee => this.role = employee.role)
    this.role = getRole()

  }

  createNotice() {
    try {
      this.createNoticeRequest = {
        notice_title: this.createNoticeForm.value.notice_title as string,
        notice_body: this.createNoticeForm.value.notice_body as string,
        category: this.createNoticeForm.value.category as string,
      }
      if (!this.createNoticeForm.valid) this.toastr.error('Enter valid data', 'Invalid Form', { timeOut: 1500 })
      else {
        this.noticesService.createNotice(this.createNoticeRequest).subscribe(data => {
          this.router.navigate(['/admin/notices'])
          this.toastr.success('Notice created successfully', 'Notice Created', { timeOut: 1500 })
        }, error => {
          this.toastr.error(JSON.parse(error.error).message, JSON.parse(error.error.error), { timeOut: 1500 })
        })
      }
    } catch (error: any) {
      console.log(error);

      this.toastr.error(error?.message, error, { timeOut: 1500 })

    }
  }
  getAllCategory() {
    this.noticesService.getAllCategories().subscribe(data => {
      data.map(category => {
        this.categories.push({ category: category.category, createdBy: category.Employee.emp_name })
      })
    }
    )
  }
}
