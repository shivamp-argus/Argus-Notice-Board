import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoticesComponent } from './notices/notices.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'admin', component: HomeComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'superadmin/employees', component: EmployeesListComponent },
      { path: 'superadmin/notices', component: NoticesComponent },
      { path: 'profile', component: ProfileComponent }

    ]
  },
  { path: 'auth/:mode', component: AuthComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

