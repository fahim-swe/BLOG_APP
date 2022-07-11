import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { post } from 'src/_model/post';

import { PostServiceService } from 'src/_service/post-service.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() checker!: boolean;
  @Input() Post!:post[];
  
  isReading = false;
  index = -1;

  constructor(private post:PostServiceService) { }

  ngOnInit(): void {
   
  }

  continueReading(idx : number)
  {
    this.isReading = !this.isReading;
    this.index = idx;
  }

  deletePost(id: string)
  { 
    this.post.deletePost(id).subscribe(res => {
      console.log(res);
    })
  }
}
