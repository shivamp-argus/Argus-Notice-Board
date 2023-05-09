import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NoticesService } from '../notices/notices.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Categories } from '../create-notice/create-notice.component';

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
    private readonly authService: AuthService
  ) { }

  categories: Categories[] = []
  createCategoryRequest: createCategoryRequest = {
    category: ''
  }
  role: string = ''

  createCategoryForm = new FormGroup({
    category: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.authService.me().subscribe(employee => this.role = employee.role)
    this.noticesService.getAllCategories().subscribe(data => {
      data.map(category => {
        this.categories.push({ category: category.category, createdBy: category.Employee.emp_name })
      })

    }
    )
  }

  createCategory() {
    try {
      this.createCategoryRequest = {
        category: this.createCategoryForm.value.category as string
      }
      this.noticesService.createCategory(this.createCategoryRequest).subscribe(data => {
        console.log(data);
        if (this.role === 'SUPERADMIN') {
          this.router.navigate(['/admin/superadmin/notices'])
        } else {
          this.router.navigate(['/employees/notice'])
        }

      })
    } catch (error) {
      console.log(error);

    }

  }
}
