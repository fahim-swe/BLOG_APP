import { Component, OnInit } from '@angular/core';
import { UserToken } from 'src/_model/Token';
import { AccountService } from 'src/_service/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
  title = 'UI';

  constructor(private account: AccountService){}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser()
  {
    const user : UserToken = JSON.parse(localStorage.getItem('user') || '');
    if(user){
      this.account.setCurrentUser(user);
    }
  }
}
