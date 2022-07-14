import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { map, ReplaySubject, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserToken } from 'src/_model/Token';
import { user } from 'src/_model/user';



@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseURI = environment.baseURI;

  private currentUserSource = new ReplaySubject<UserToken | undefined>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http:HttpClient) { }

  

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  createNewPost(content: any)
  {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(content);
    console.log(body)
    return this.http.post(this.baseURI + '/Post', body, this.httpOptions);
  }

  createAccount(model: any)
  {
    
    const body = JSON.stringify(model);
    return this.http.post( this.baseURI + '/Account', body, this.httpOptions).pipe(
      map((res: any)=>{
         const user = res;
         if(user)
         {
          localStorage.setItem('user', JSON.stringify(user));
          this.setCurrentUser(user);
         }
      })
    );
  }

  login(model : any)
  {
    const body = JSON.stringify(model);
    // console.log(body);
    return this.http.post( this.baseURI + '/Account/login', body, this.httpOptions).pipe(
      map((res: any)=>{
        const user = res;
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          // console.log(user);
          this.setCurrentUser(user);
        }
      })
    )
  }

  
  logout()
  {
    localStorage.removeItem('user');
    this.currentUserSource.next(undefined);
  }

  setCurrentUser(user: UserToken)
  {
    this.currentUserSource.next(user);
  }
   
  getUser(username: string)
  {
    return this.http.get<user>(this.baseURI + '/Account/' + username);
  }
}
