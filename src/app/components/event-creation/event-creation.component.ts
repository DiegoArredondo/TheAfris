import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { NgxMaterialTimepickerComponent } from 'ngx-material-timepicker';
import { Evento } from 'src/app/entities/evento';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-event-creation',
  templateUrl: './event-creation.component.html',
  styleUrls: ['./event-creation.component.scss']
})
export class EventCreationComponent implements OnInit {

  infoMsg: string;
  errorMsg: boolean = false;

  createEventForm: FormGroup;
  submitted = false;

  date = new FormControl(new Date());
  time: String;

  posted: boolean = false;

  eventoMockup = {
    "titulo": "Titulo del evento",
    "descripcion": "Descripcion de prueba",
    "fechaHora": "2020-04-20 12:00:17",
    "etiquetas": "#etiqueta1,#etiqueta2,#etiqueta3",
    "duracion": "5 dias",
    "creador": 1,
    "cupo": 50,
    "ubicacion": "Lugar del evento"
  } as Evento;


  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    // Preguntar si quieren tener hora predeterminada
    this.time = "4:00 pm"
  }

  ngOnInit(): void {
    this.createEventForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      ubicacion: ['',],
      descripcion: ['', Validators.required],
    });
  }

  // Un getter conveniente para un fácil acceso a los datos de los campos del formulario
  get f() { return this.createEventForm.controls; }

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
    if (this.createEventForm.invalid || this.posted) {
      this.posted = false;
      return;
    }

    let d = (this.date.value as Date).toLocaleDateString().split("/")
    let finalDate = d[2] + "-" + (d[1].length == 1 ? ("0" + d[1]) : d[1]) + "-" + (d[0].length == 1 ? ("0" + d[0]) : d[0]) + " " + (this.date.value as Date).toLocaleTimeString();

    let evento = {
      creador: 1,
      "titulo": this.f.nombre.value,
      "descripcion": this.f.descripcion.value,
      "etiquetas": "#etiquetaDePrueba",
      "fechaHora": finalDate,
      "duracion": "4 horas",
      "cupo": 10,
      "ubicacion": this.f.ubicacion.value,
    } as Evento;

    console.log(evento)
    this.posted = true;
    this.apiService.post(ApiService.createEventUrl, evento).subscribe(data => {
      debugger;
      if (data.error) {
        this.infoMsg = data.error + "";
        this.errorMsg = true;
      } else {
        this.infoMsg = ("El evento '" + evento.titulo + "' ha sido creado con éxito").toString();
        this.errorMsg = false;
      }
    }, error => {
      this.infoMsg = error;
      this.errorMsg = true;
    })

  }

}
