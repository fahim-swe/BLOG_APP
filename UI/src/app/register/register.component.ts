import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route } from '@angular/router';
import { AccountService } from 'src/_service/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group(
    {
      userName : ['',],
      password: [''],
      dateOfBirth: [''],
      email: [''],
      phone: ['']
    }
  )
  
  constructor(private fb: FormBuilder, private account: AccountService) { }

  ngOnInit(): void {
  }

  onSubmit()
  {
    console
    if(this.registerForm.valid)
    {
      this.account.createAccount(this.registerForm.value).subscribe(res => {
        console.log(res);
      })
    }
  }

  
}
