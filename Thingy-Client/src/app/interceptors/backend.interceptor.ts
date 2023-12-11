import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if the request URL is for an external API
    if (!this.isExternalApi(request.url)) {
      // Append the base URL for internal API requests
      const baseUrl = environment.backendbaseURL;
      const apiReq = request.clone({ url: `${baseUrl}/${request.url}` });
      return next.handle(apiReq);
    }
    // For external API requests, do not modify the URL
    return next.handle(request);
  }

  private isExternalApi(url: string): boolean {
    // Add other external API base URLs as needed
    const externalApis = ['https://api.openai.com'];
    return externalApis.some(apiUrl => url.startsWith(apiUrl));
  }
}
