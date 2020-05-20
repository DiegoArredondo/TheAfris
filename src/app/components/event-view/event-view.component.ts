import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { NgxMaterialTimepickerComponent } from 'ngx-material-timepicker';
import { Evento } from 'src/app/entities/evento';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {

  infoMsg: string;
  errorMsg: boolean = false;

  editEventForm: FormGroup;
  submitted = false;

  date = new FormControl(new Date());
  time: String;

  posted: boolean = false;

  evento:Evento;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router, private route: ActivatedRoute) {
  
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      if(params.get('id')){
        this.apiService.post(ApiService.getEventById, {"id":params.get('id')}).subscribe(data=>{
          debugger
          if(data){
            this.evento = data as Evento;
            this.f.titulo.setValue(this.evento.titulo)
            this.f.descripcion.setValue(this.evento.descripcion)
            this.f.fecha.setValue(moment(this.evento.fechaHora).format("DD/mm/YYYY"))
            let usableDate = new Date(this.evento.fechaHora);
            this.time = usableDate.getHours() + ":" + usableDate.getMinutes()
            this.f.hora.setValue(usableDate.getHours() + ":" + usableDate.getMinutes())
            this.f.ubicacion.setValue(this.evento.ubicacion)
          }
        }, error =>{
          this.infoMsg = error;
          this.errorMsg = true;
          return
        })
      } else {
        this.router.navigate(["listaEventos"]);
        return;
      }
    });

    this.editEventForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      ubicacion: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }
  get f() { return this.editEventForm.controls; }

}
