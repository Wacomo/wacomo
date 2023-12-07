import { HttpInterceptorFn } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import { environment } from '../../environments/environment.prod';


@Injectable()
export class BackendInterceptor implements HttpInterceptor  {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const baseUrl = environment.backendbaseURL;
        const apiReq = request.clone({ url: `${baseUrl}/${request.url}` });
        return next.handle(apiReq);
    }
}
