import { Component, OnInit } from '@angular/core';
import { EmployeesService, UpdateEmployee } from '../employees-list/employees.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Role } from '../app.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly authService: AuthService,
    private readonly toastr: ToastrService
  ) { }

  allowEdit: boolean = false
  personalDetailsForm = new FormGroup({
    emp_name: new FormControl('', Validators.required),
    emp_email: new FormControl('', Validators.required),
    role: new FormControl(Role.EMPLOYEE, Validators.required),
    status: new FormControl('', Validators.required)
  })
  teams: string[] = []
  notices: string[] = []

  ngOnInit(): void {
    this.authService.me().subscribe(data => {
      this.personalDetailsForm.setValue({
        emp_name: data.user.emp_name,
        emp_email: data.user.emp_email,
        role: data.user.role,
        status: data.user.isActive === true ? 'Active' : 'Inactive'
      })
      if (!this.allowEdit) {
        this.personalDetailsForm.disable()
      }
      data.user.Employee_Team.map(team => this.teams.push(team.Team.team_name))
      data.notices.map(notice => this.notices.push(notice.notice_title))


    }, error => {
      this.toastr.error(error.error.message, error.error.error, { timeOut: 1500 })
    })
  }
  allowUpdate() {
    this.allowEdit = true
    this.personalDetailsForm.enable()
    this.personalDetailsForm.get('role')?.disable()
    this.personalDetailsForm.get('status')?.disable()
  }
  updatePersonalDetails() {
    this.allowEdit = false
    this.personalDetailsForm.disable()
    // console.log(this.personalDetailsForm.value);

    const updateProfile: UpdateEmployee = {
      emp_name: this.personalDetailsForm.value.emp_name ?? '',
      emp_email: this.personalDetailsForm.value.emp_email ?? '',
      role: this.personalDetailsForm.value.role as Role,
      isActive: this.personalDetailsForm.value.status === 'Active' ? true : false

    }
    this.employeesService.updateProfile(updateProfile).subscribe(data => {
      this.personalDetailsForm.setValue({
        emp_name: data.emp_name,
        emp_email: data.emp_email,
        role: data.role,
        status: data.isActive === true ? 'Active' : 'Inactive'
      })
      this.toastr.success('Your profile updated successfully', 'Profile Updated', { timeOut: 1500 })

    }, error => {
      this.toastr.error(error.error.message, error.error.error, { timeOut: 1500 })
    })


  }
}
