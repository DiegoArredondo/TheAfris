import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Evento } from 'src/app/entities/evento';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  feed: any[];
  eventos : Evento[];
  constructor(private apiService:ApiService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.get(ApiService.getFeed).subscribe(data=>{
      if(data.feed){
        this.feed = data.feed.reverse()
      }
    })
    this.apiService.get(ApiService.getAllEvents).subscribe(data=>{
      this.eventos = data.reverse();
    })
  }

  
  getFecha(date){
    return moment(date).format("DD/mm/YYYY")
  }

  getHora(date){
    let usableDate = new Date(date)
    let usableTime = usableDate.toString().split(" ")[4].split(":")
    let hour = Number.parseInt(usableTime[0])
    return (hour > 12 ? hour-12 : hour) + ":" + usableTime[1] + (hour>=12 ? " P.M." : " A.M.")
  }
  goTo(goto){
    this.router.navigate([goto]);
  }

}
