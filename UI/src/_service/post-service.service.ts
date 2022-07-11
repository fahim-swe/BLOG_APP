import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { post } from 'src/_model/post';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  

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
    return this.http.post('https://localhost:7154/Post', body, this.httpOptions);
  }
  
  getPost()
  {
    return this.http.get<post[]>('https://localhost:7154/Post');
  }

  getUserPost(username: any)
  {
    return this.http.get<post[]>('https://localhost:7154/Post/' + username)
  }

  deletePost(id: string)
  {
    return this.http.delete<any>('https://localhost:7154/Post/' + id);
  }
}
