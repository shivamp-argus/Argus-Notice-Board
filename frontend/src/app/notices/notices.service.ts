import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notices } from './notices.component';
import { Categories, CreateNoticeRequest } from '../create-notice/create-notice.component';

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
      headers: this.httpHeaders
    })
  }
  getAllNoticesByEmployee() {

  }
  getAllNoticesByHR() {
    return this.http.get<Notices[]>('http://localhost:3000/notice/hr', { headers: this.httpHeaders })
  }

  getAllCategories() {
    return this.http.get<Categories[]>('http://localhost:3000/categories', { headers: this.httpHeaders })
  }
  createNotice(createNoticeRequest: CreateNoticeRequest) {
    return this.http.post('http://localhost:3000/notice', createNoticeRequest, { headers: this.httpHeaders, responseType: 'text' })
  }
}
