import { Component, OnInit } from '@angular/core';
import { post } from 'src/_model/post';
import { AccountService } from 'src/_service/account.service';
import { PostServiceService } from 'src/_service/post-service.service';

import { UserToken } from 'src/_model/Token';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  Post! : post[];

  checker = true;
  constructor(private account: AccountService, private post: PostServiceService) {
  }

  ngOnInit(): void {

    const user : UserToken = JSON.parse(localStorage.getItem('user') || '');
    this.post.getUserPost(user.userName).subscribe(res => {
      this.Post = res;
    })

  }

}
