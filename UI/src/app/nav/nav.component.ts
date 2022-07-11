import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { AccountService } from 'src/_service/account.service';
import { CreatePostComponent } from '../create-post/create-post.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private route: Router,  private account: AccountService, public dialog : MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    console.log("HII");
    this.dialog.open(CreatePostComponent, {
      disableClose: true,
      position: {top: '7%'}
    });
  }

  logout()
  {
    console.log("OUTOUT");
    this.account.logout();
    this.route.navigateByUrl('/login');

  }
}
