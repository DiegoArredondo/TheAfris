import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';
import { Evento } from 'src/app/entities/evento';
import { Router } from '@angular/router';


@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.scss']
})
export class AllEventsComponent implements OnInit {


  eventos : Evento[];
  

  errorMsg = false;
  infoMsg;

  constructor(private apiService : ApiService, private router: Router) { }

  ngOnInit(): void {

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


}
