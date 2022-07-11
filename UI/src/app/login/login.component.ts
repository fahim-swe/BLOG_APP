
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/_service/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, 
    private account: AccountService, private route: Router) { }


  ngOnInit(): void {
  }

  loginFrom = this.fb.group(
    {
      userName: [''],
      password: ['']
    }
  )

  onSubmit()
  {
    console.log(this.loginFrom.value);
    this.account.login(this.loginFrom.value).subscribe(res => {
      console.log("HII" + res);
      this.route.navigateByUrl('/news-feed');
    })
  }


}
