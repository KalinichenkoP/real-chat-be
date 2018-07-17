import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccessInterceptorService implements HttpInterceptor {

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = req.clone({
      setHeaders: {
        "Access-Control-Allow-Origin": `localhost:4200`
      }
    });
    return next.handle(newReq);
  }
}
