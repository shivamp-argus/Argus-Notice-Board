import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private readonly toastr: ToastrService) { }
  handleServerError(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.toastr.error('Server is down', 'Server Error')
    }
  }
}
