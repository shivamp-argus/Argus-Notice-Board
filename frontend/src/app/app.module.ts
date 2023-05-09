import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { NoticesComponent } from './notices/notices.component';
import { ProfileComponent } from './profile/profile.component';

import { EmpTeamComponent } from './team/emp-team/emp-team.component';
import { CreateNoticeComponent } from './create-notice/create-notice.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { TeamComponent } from './team/team.component';
import { EmpNoticeComponent } from './team/emp-notice/emp-notice.component';
import { TeamsListComponent } from './teams-list/teams-list.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    HeaderComponent,
    DashboardComponent,
    SidebarComponent,
    EmployeesListComponent,
    NoticesComponent,
    ProfileComponent,

    EmpTeamComponent,
    CreateNoticeComponent,
    CreateCategoryComponent,
    TeamComponent,
    EmpNoticeComponent,
    TeamsListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
