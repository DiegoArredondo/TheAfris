import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Publicacion } from 'src/app/entities/publicacion';
import { Router } from '@angular/router';
@Component({
  selector: 'app-lista-publicaciones',
  templateUrl: './lista-publicaciones.component.html',
  styleUrls: ['./lista-publicaciones.component.scss']
})
export class ListaPublicacionesComponent implements OnInit {
  modalMsg = "";

  selectedPublicacion : Publicacion;

  errorMsg = false;
  infoMsg;
  feed: Publicacion[];
  constructor(private apiService:ApiService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.get(ApiService.getFeed).subscribe(data=>{
      if(data.feed){
        this.feed = data.feed.reverse()
      }
    })
  }
  respuestaModal(b){
    this.modalMsg = null;
    this.errorMsg = false;
    if(b){
      //borrar el evento y mostrar un mensaje diciendo que ya se bo
      this.apiService.post(ApiService.deleteEventUrl,{"id": this.selectedPublicacion.id}).subscribe(data=>{
        debugger;
        if(data.success){
        this.infoMsg = "Publicación eliminado con éxito"
        this.feed.splice(this.feed.indexOf(this.selectedPublicacion), 1);
        this.selectedPublicacion == null;
        }
      }, error => {
        this.infoMsg = error;
        this.errorMsg = true;
        this.selectedPublicacion == null;
      })
    }
  }
  editar(item:Publicacion){
    this.infoMsg = ""
    this.router.navigate(['/editarPublicacion', {"id": item.id} ]);
  }
  
  eliminar(item:Publicacion){
    this.infoMsg = ""
    this.selectedPublicacion = item;
    this.modalMsg = "¿Está seguro de querer eliminar la publicación '" + item.titulo + "'? <br> Esta acción no podrá deshacerse."
  }
}
