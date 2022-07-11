import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AccountService } from 'src/_service/account.service';
import { PostServiceService } from 'src/_service/post-service.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(private fb: FormBuilder,private post: PostServiceService, private account: AccountService) { }

  contentFrom = this.fb.group(
    {
      content : ['']
    }
  )

  ngOnInit(): void {
  }

  createPost()
  {
    this.post.createNewPost(this.contentFrom.value).subscribe(res => {
      console.log(res);
    })
  }

}
