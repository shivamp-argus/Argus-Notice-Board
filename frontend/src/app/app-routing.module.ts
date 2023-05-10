import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoticesComponent } from './notices/notices.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth/auth.guard';
import { EmpTeamComponent } from './team/emp-team/emp-team.component';
import { CreateNoticeComponent } from './create-notice/create-notice.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { TeamComponent } from './team/team.component';
import { EmpNoticeComponent } from './team/emp-notice/emp-notice.component';
import { TeamsListComponent } from './team/teams-list/teams-list.component';
import { CreateTeamComponent } from './team/create-team/create-team.component';


const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/:mode', component: AuthComponent },
  {
    path: 'admin', component: HomeComponent, canActivate: [AuthGuard], data: {
      expectedRole: ['SUPERADMIN', 'HR']
    },
    children: [
      { path: '', component: DashboardComponent },
      { path: 'employees', component: EmployeesListComponent },
      { path: 'notices', component: NoticesComponent },
      {
        path: 'teams', component: TeamComponent,
        children: [
          { path: '', component: TeamsListComponent, data: { expectedRole: ['HR', 'SUPERADMIN'] } },
          { path: 'create-emp-team', component: EmpTeamComponent, data: { expectedRole: ['HR', 'SUPERADMIN'] } },
          { path: 'create-notice-team', component: EmpNoticeComponent, data: { expectedRole: ['HR', 'SUPERADMIN'] } },
          { path: 'create-team', component: CreateTeamComponent, data: { expectedRole: ['HR', 'SUPERADMIN'] } }
        ]
      },
      { path: 'profile', component: ProfileComponent },
      { path: 'create-notice', component: CreateNoticeComponent },
      { path: 'create-category', component: CreateCategoryComponent }

    ]
  },
  {
    path: 'employees', component: HomeComponent, canActivate: [AuthGuard], data: {
      expectedRole: ['EMPLOYEE'],
      children: [
        { path: '', component: DashboardComponent },
        // {path:'teams',component:}
      ]
    }
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

