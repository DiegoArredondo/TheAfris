import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';
import { Evento } from 'src/app/entities/evento';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.scss']
})
export class ListaEventosComponent implements OnInit {

  modalMsg = "";

  eventos : Evento[];
  selectedEvento : Evento;

  errorMsg = false;
  infoMsg;

  constructor(private apiService : ApiService, private router: Router) { }

  ngOnInit(): void {

    this.apiService.get(ApiService.getAllEvents).subscribe(data=>{
      this.eventos = data.reverse();
    })

  }

  respuestaModal(b){
    this.modalMsg = null;
    this.errorMsg = false;
    if(b){
      //borrar el evento y mostrar un mensaje diciendo que ya se bo
      this.apiService.post(ApiService.deleteEventUrl,{"id": this.selectedEvento.id}).subscribe(data=>{
        debugger;
        if(data.success){
        this.infoMsg = "Evento eliminado con éxito"
        this.eventos.splice(this.eventos.indexOf(this.selectedEvento), 1);
        this.selectedEvento == null;
        }
      }, error => {
        this.infoMsg = error;
        this.errorMsg = true;
        this.selectedEvento == null;
      })
    }
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

  editar(item:Evento){
    this.infoMsg = ""
    this.router.navigate(['/editarEvento', {"id": item.id} ]);
  }
  
  eliminar(item:Evento){
    this.infoMsg = ""
    this.selectedEvento = item;
    this.modalMsg = "¿Está seguro de querer eliminar el evento '" + item.titulo + "'? <br> Esta acción no podrá deshacerse."
  }

}
