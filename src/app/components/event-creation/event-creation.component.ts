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

  eventoMockup = {
    "titulo": "Titulo del evento",
    "descripcion": "Descripcion de prueba",
    "fechaHora": new Date(),
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
    this.eventoMockup.fechaHora.setHours(horaNum, minutosNum);
  }

  onSubmit() {
    this.infoMsg = "";
    this.errorMsg = true;
    this.submitted = true;

    // Se detiene aquí si el formulario es inválido 
    if (this.createEventForm.invalid) {
      return;
    }

    let evento = {
      creador: 1,
      "titulo": this.f.nombre.value,
      "descripcion": this.f.descripcion.value,
      "etiquetas": "#etiquetaDePrueba",
      "fechaHora": this.date.value,
      "duracion": "4 horas",
      "cupo": 10,
      "ubicacion": this.f.ubicacion.value,
    } as Evento;

    this.apiService.post(ApiService.createEventUrl, evento).subscribe(data => {
      debugger;
      if (data.error) {
        this.infoMsg = data.error + "";
        this.errorMsg = true;
      } else {
        this.infoMsg = "El evento '" + evento.titulo + "' ha sido creado con éxito";
      }
    }, error => {
      this.infoMsg = error;
      this.errorMsg = true;
    })

  }

}
