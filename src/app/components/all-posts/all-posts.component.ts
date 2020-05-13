import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent implements OnInit {
  feed: any[];
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.apiService.get(ApiService.getFeed).subscribe(data=>{
      if(data.feed){
        this.feed = data.feed.reverse()
      }
    })
  }

}
