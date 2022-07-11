import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AccountService } from 'src/_service/account.service';
import { UserToken } from 'src/_model/Token';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private account: AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    let token : any;
    this.account.currentUser$.pipe(take(1)).subscribe(user => {
     
      token = user?.token;
    });

    // console.log("JWT INCEPTER : " + token);
    if(token)
    {
      request = request.clone(
        {
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        }
      )
    }

    return next.handle(request);
  }
}
