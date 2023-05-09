import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoticesComponent } from './notices/notices.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth/auth.guard';
import { EmpTeamComponent } from './emp-team/emp-team.component';
import { CreateNoticeComponent } from './create-notice/create-notice.component';


const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/:mode', component: AuthComponent },
  {
    path: 'admin', component: HomeComponent, canActivate: [AuthGuard], data: {
      expectedRole: ['SUPERADMIN']
    },
    children: [
      { path: '', component: DashboardComponent },
      { path: 'superadmin/employees', component: EmployeesListComponent },
      { path: 'superadmin/notices', component: NoticesComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'create', component: CreateNoticeComponent }

    ]
  },
  {
    path: 'employees', component: HomeComponent, data: { expectedRole: ['HR', 'EMPLOYEES'] }, canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'list', component: EmployeesListComponent, data: { expectedRole: ['HR', 'EMPLOYEES'] } },
      { path: 'teams', component: EmpTeamComponent, data: { expectedRole: ['HR', 'EMPLOYEES'] } },
      { path: 'notice', component: NoticesComponent, data: { expectedRole: ['HR', 'EMPLOYEES'] } },
      { path: 'create', component: CreateNoticeComponent, data: { expectedRole: ['HR', 'SUPERADMIN'] } }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

