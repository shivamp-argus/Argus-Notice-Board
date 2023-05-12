import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private readonly errorHandlerService: ErrorHandlerService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandlerService.handleServerError(error)
        return throwError(error)
      }));
  }
}
