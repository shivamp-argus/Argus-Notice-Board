import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NoticesService } from '../notices/notices.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Categories, CategoriesResponse } from '../create-notice/create-notice.component';
import { ToastrService } from 'ngx-toastr';
import { Role, getRole } from '../app.component';

export type createCategoryRequest = {
  category: string
}

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  constructor(
    private readonly noticesService: NoticesService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly toastr: ToastrService
  ) { }

  error: string = ''
  categories: CategoriesResponse[] = []
  createCategoryRequest: createCategoryRequest = {
    category: ''
  }
  role: Role = Role.EMPLOYEE

  createCategoryForm = new FormGroup({
    category: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.role = getRole()
    this.noticesService.getAllCategories().subscribe(data => {
      this.categories = data

    }
    )
  }

  createCategory() {
    try {
      this.createCategoryRequest = {
        category: this.createCategoryForm.value.category as string
      }
      if (!this.createCategoryForm.valid) {
        this.toastr.error('Please enter valid category', 'Category Required', { timeOut: 1500 })
      } else {
        this.noticesService.createCategory(this.createCategoryRequest).subscribe(data => {
          this.router.navigate(['admin', 'notices'])
          this.toastr.success('Category created successfully', 'Category created', { timeOut: 1500 })
        },
          (error) => {
            if (error.status !== 0) {
              this.error = JSON.parse(error.error).message
              this.toastr.error(this.error, JSON.parse(error.error).error, { timeOut: 1500 })
            }
          })
      }
    } catch (e: any) {
      this.toastr.error(e)
    }

  }
}
