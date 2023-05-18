import { Component, OnInit } from '@angular/core';
import { EmployeesService } from './employees.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Role, getRole } from '../app.component';


export type Employees = {
  id: string,
  emp_email: string,
  emp_name: string,
  role: string,
  isActive: boolean
}
@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly authService: AuthService,
    private readonly toastr: ToastrService
  ) {
    // console.log('hiii component init');

  }
  employees: Employees[] = []
  status: string = 'active'
  toggleStatus: string = 'deactivate'
  selectedEmployeeId: string = ''
  role: Role = Role.EMPLOYEE


  ngOnInit(): void {
    // this.authService.me().subscribe(
    //   employee => this.role = employee.role,
    //   error => {
    //     this.toastr.error(error.error.message, error.error.error, { timeOut: 1500 })
    //   }
    // )
    this.role = getRole()
    this.getAllEmployees()
  }

  getAllEmployees() {
    this.employeesService.getAllEmployees(this.status).subscribe(data => {
      this.employees = data
    }, error => {
      console.log(error);

      this.toastr.error(error.error.message, error.error.error, { timeOut: 1500 })
    }
    )
  }
  changeStatus(selectedStatus: string) {
    this.status = selectedStatus
    this.toggleStatus = this.status === 'active' ? 'deactivate' : 'activate'
    this.getAllEmployees()
  }
  changeStatusText() {
    if (this.status === 'active') {
      return 'Active'
    } else {
      return 'Inactive'
    }
  }
  changeModalText() {
    if (this.status !== 'active') {
      return 'active'
    } else {
      return 'inactive'
    }
  }
  toggleEmployeeStatus(id: string) {
    this.employeesService.toggleEmployeeStatus(id, this.toggleStatus).subscribe(data => {
      this.getAllEmployees()
      this.toastr.success(`Employee marked as ${this.toggleStatus}`, 'Status Changed', { timeOut: 1500 })
    }, (error) => {
      this.toastr.error(error.error.message, error.error.error, { timeOut: 1500 })
    })
  }
  selectedEmployee(id: string) {
    this.selectedEmployeeId = id
  }
}
