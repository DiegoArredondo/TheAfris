import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { NgxMaterialTimepickerComponent } from 'ngx-material-timepicker';
import { Evento } from 'src/app/entities/evento';
import * as moment from 'moment';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {

  
  infoMsg: string;
  errorMsg: boolean = false;

  editEventForm: FormGroup;
  submitted = false;

  date = new FormControl(new Date());
  time: String;

  posted: boolean = false;

  evento:Evento;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    // Preguntar si quieren tener hora predeterminada
    this.time = "4:00 pm"
  }

  ngOnInit(): void {
    this.editEventForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      ubicacion: ['', Validators.required],
      descripcion: ['', Validators.required],
    });

    this.evento = {
    "id" : 1,
    "titulo" : "Titulo del evento",
    "descripcion" : "Descripcion de prueba",
    "fechaHora" : "2020-04-20 12:06:17",
    "etiquetas" : "#etiqueta1,#etiqueta2,#etiqueta3",
    "duracion" : "5 dias",
    "creador" : 1,
    "cupo" : 50,
    "ubicacion" : "Lugar del evento"
    }

    this.f.titulo.setValue(this.evento.titulo)
    this.f.descripcion.setValue(this.evento.descripcion)
    this.f.fecha.setValue(moment(this.evento.fechaHora).format("DD/mm/YYYY"))
    let usableDate = new Date(this.evento.fechaHora);
    this.time = usableDate.getHours() + ":" + usableDate.getMinutes()
    this.f.hora.setValue(usableDate.getHours() + ":" + usableDate.getMinutes())
    //this.f.etiquetas = evento.etiquetas
    //this.f.duracion = evento.duracion
    //this.f.cupo = evento.cupo
    this.f.ubicacion.setValue(this.evento.ubicacion)
    
  }

  // Un getter conveniente para un fácil acceso a los datos de los campos del formulario
  get f() { return this.editEventForm.controls; }

  _openCalendar(picker: MatDatepicker<Date>) {
    picker.open();
  }
  _openTimer(picker: NgxMaterialTimepickerComponent) {
    picker.open();
  }

  onTimeSet(time) {
    this.time = time;
    // Establecer hora
    let horaStr = time.split(":")[0];
    let horaNum = Number.parseInt(horaStr);
    if (this.time.indexOf("PM") != -1) horaNum += 12; // Si es pm
    let minutosStr = time.split(":")[1].split(" ")[0];
    let minutosNum = Number.parseInt(minutosStr);
    this.date.value.setHours(horaNum, minutosNum);
  }

  onSubmit() {
    this.infoMsg = "";
    this.errorMsg = false;
    this.submitted = true;

    // Se detiene aquí si el formulario es inválido 
    if (this.editEventForm.invalid || this.posted) {
      this.posted = false;
      return;
    }

    let finalDate = moment(this.f.fecha.value as Date).format("DD-mm-YYYY") + " " + (this.date.value as Date).toLocaleTimeString();

    this.evento.titulo = this.f.titulo.value;
    this.evento.descripcion = this.f.titulo.value;
    this.evento.fechaHora = finalDate
    this.evento.ubicacion = this.f.ubicacion.value;


    console.log(this.evento)
    this.posted = true;
    this.apiService.post(ApiService.updateEventUrl, this.evento).subscribe(data => {
      debugger;
      if (data.error) {
        this.infoMsg = data.error + "";
        this.errorMsg = true;
      } else {
        this.infoMsg = ("El evento '" + this.evento.titulo + "' ha sido creado con éxito").toString();
        this.errorMsg = false;
      }
    }, error => {
      this.infoMsg = error;
      this.errorMsg = true;
    }) 

  }

}
