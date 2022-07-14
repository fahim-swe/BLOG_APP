import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { post } from 'src/_model/post';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  baseURI = environment.baseURI;
  constructor(private account: AccountService, private http: HttpClient) { 
    
  }

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
  
  getPost()
  {
    return this.http.get<post[]>( this.baseURI + '/Post');
  }

  getUserPost(username: any)
  {
    return this.http.get<post[]>( this.baseURI + '/Post/' + username)
  }

  deletePost(id: string)
  {
    return this.http.delete<any>(this.baseURI + '/Post/' + id);
  }
}

