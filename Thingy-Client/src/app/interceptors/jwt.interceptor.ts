import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import AuthService from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Check if the request is for an external API
        if (!this.isExternalApi(request.url)) {
            // Add authorization header with JWT token if available
            const currentUser = this.authService.currentUserValue;
            if (currentUser && currentUser.token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${currentUser.token}`
                    }
                });
            }
        }

        return next.handle(request);
    }

    private isExternalApi(url: string): boolean {
        // List of external APIs that should not have the JWT token
        const externalApis = ['https://api.openai.com'];
        return externalApis.some(apiUrl => url.startsWith(apiUrl));
    }
}
