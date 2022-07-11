import { Component, OnInit } from '@angular/core';
import { user } from 'src/_model/user';
import { AccountService } from 'src/_service/account.service';
import { PostServiceService } from 'src/_service/post-service.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user! :user;

  constructor(private account: AccountService) { }

  ngOnInit(): void {


    this.account.getUser('fahim').subscribe(res => {
      this.user = res;
    })
    
  }

}
