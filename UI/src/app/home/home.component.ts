import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { post } from 'src/_model/post';
import { AccountService } from 'src/_service/account.service';
import { PostServiceService } from 'src/_service/post-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token : any;
  Post! : post[];
  constructor(private account: AccountService, private post: PostServiceService) { 
    account.currentUser$.pipe(take(1)).subscribe(res => {
      this.token = res?.token;
    })
  }

  ngOnInit(): void {
    this.post.getPost().subscribe(res=>{
      this.Post = res;
    })
  }

}
