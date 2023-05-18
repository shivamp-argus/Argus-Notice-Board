import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QuillModule } from 'ngx-quill'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { NoticesComponent } from './notices/notices.component';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { EmpTeamComponent } from './team/emp-team/emp-team.component';
import { CreateNoticeComponent } from './create-notice/create-notice.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { TeamComponent } from './team/team.component';
import { EmpNoticeComponent } from './team/emp-notice/emp-notice.component';
import { TeamsListComponent } from './team/teams-list/teams-list.component';
import { CreateTeamComponent } from './team/create-team/create-team.component';
import { EmployeesNoticeComponent } from './employees-notice/employees-notice.component';
import { EmployeesTeamComponent } from './employees-team/employees-team.component';
import { ToastrModule } from 'ngx-toastr';

import { ErrorHandlerInterceptor } from './error/error-handler.interceptor';
import { ViewNoticeComponent } from './view-notice/view-notice.component';


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
    CreateTeamComponent,
    EmployeesNoticeComponent,
    EmployeesTeamComponent,
    ViewNoticeComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    QuillModule.forRoot()


  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
