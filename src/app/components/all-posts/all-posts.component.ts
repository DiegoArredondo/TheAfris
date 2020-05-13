import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { Publicacion } from 'src/app/entities/publicacion';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent implements OnInit {
  feed: any[];
  infoMsg;
  constructor(private apiService:ApiService, private router: Router) { }
  selectedPublicacion : Publicacion;
  ngOnInit(): void {
    this.apiService.get(ApiService.getFeed).subscribe(data=>{
      if(data.feed){
        this.feed = data.feed.reverse()
      }
    })
  }
  consultarPublicacion(item:Publicacion){
    this.infoMsg = ""
    this.router.navigate(['/publicacion', {"id": item.id} ]);
  }
}
