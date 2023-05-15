import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notices } from './notices.component';
import { CategoriesResponse, CreateNoticeRequest } from '../create-notice/create-notice.component';
import { createCategoryRequest } from '../create-category/create-category.component';
import { NoticeTeamRequest } from '../team/emp-notice/emp-notice.component';
import { EmpNotice } from '../employees-notice/employees-notice.component';

@Injectable({
  providedIn: 'root'
})
export class NoticesService {

  constructor(private readonly http: HttpClient) { }
  token = localStorage.getItem('token')
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`,

  })

  getAllNoticesBySuperadmin() {
    return this.http.get<Notices[]>('http://localhost:3000/notice/superadmin', { headers: this.httpHeaders })
  }
  toggleNoticeStatus(id: string) {
    return this.http.patch(`http://localhost:3000/notice/publish/${id}`, null, {
      headers: this.httpHeaders,
      responseType: 'text'
    })
  }
  getAllNoticesByHR() {
    return this.http.get<Notices[]>('http://localhost:3000/notice/hr', { headers: this.httpHeaders })
  }

  getAllCategories() {
    return this.http.get<CategoriesResponse[]>('http://localhost:3000/categories', { headers: this.httpHeaders })
  }
  createNotice(createNoticeRequest: CreateNoticeRequest) {
    return this.http.post('http://localhost:3000/notice', createNoticeRequest, { headers: this.httpHeaders, responseType: 'text' })
  }
  createCategory(createCategoryRequest: createCategoryRequest) {
    return this.http.post('http://localhost:3000/categories', createCategoryRequest, { headers: this.httpHeaders, responseType: 'text' })
  }

  createNoticeTeam(createNoticeTeamRequest: NoticeTeamRequest) {
    return this.http.post('http://localhost:3000/notice-team', [createNoticeTeamRequest], { headers: this.httpHeaders, responseType: 'text' })
  }

  getAllNoticesByEmployee() {
    return this.http.get<EmpNotice[]>('http://localhost:3000/notice-team/my-notice', { headers: this.httpHeaders })
  }
}
