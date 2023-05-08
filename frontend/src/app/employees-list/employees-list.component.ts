import { Component, OnInit } from '@angular/core';
import { EmployeesService } from './employees.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';


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
  constructor(private readonly employeesService: EmployeesService, private route: ActivatedRoute) { }
  employees: Employees[] = []
  status: string = 'active'
  toggleStatus: string = 'deactivate'
  selectedEmployeeId: string = ''

  ngOnInit(): void {

    this.getAllEmployees()
  }

  getAllEmployees() {
    this.employeesService.getAllEmployees(this.status).subscribe(data => {
      this.employees = data
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
      // this.employees.filter(employee=>)
      console.log(data);
      this.getAllEmployees()

    })
  }
  selectedEmployee(id: string) {
    this.selectedEmployeeId = id
  }
}
