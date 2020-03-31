import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Publicacion } from 'src/app/entities/publicacion';

@Component({
  selector: 'app-post-creation',
  templateUrl: './post-creation.component.html',
  styleUrls: ['./post-creation.component.scss']
})
export class PostCreationComponent implements OnInit {

  infoMsg: string;
  errorMsg: boolean = false;

  createPostForm: FormGroup;
  submitted = false;

  date = new FormControl(new Date());
  time: String;

  publicacion: Publicacion;
/*
  eventoMockup = {
    "id": 1,
    "titulo": "Titulo del evento",
    "contenido": "contenido de prueba",
    "etiquetas": "#etiqueta1,#etiqueta2,#etiqueta3",
    "creador": 1,
    "seccion": 1
  } as Publicacion;
*/
  posted: boolean = false;


  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    // Preguntar si quieren tener hora predeterminada
    this.time = "4:00 pm"
  }

  ngOnInit(): void {
    this.createPostForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      seccion: ['', Validators.required],
      contenido: ['', Validators.required]
    });
    this.publicacion = {
      "id": 1,
      "titulo": "Titulo del evento",
      "contenido": "contenido de prueba",
      "etiquetas": "#etiqueta1,#etiqueta2,#etiqueta3",
      "creador": 1,
      "seccion": 1
    }
    this.f.titulo.setValue(this.publicacion.titulo)
    this.f.contenido.setValue(this.publicacion.contenido)
    this.f.creador.setValue(this.publicacion.creador)
    this.f.seccion.setValue(this.publicacion.seccion)

  }

  // Un getter conveniente para un fácil acceso a los datos de los campos del formulario
  get f() { return this.createPostForm.controls; }

  onSubmit() {
    this.infoMsg = "";
    this.errorMsg = false;
    this.submitted = true;

    // Se detiene aquí si el formulario es inválido 
    if (this.createPostForm.invalid || this.posted) {
      this.posted = false;
      return;
    }
    /*
    let publicacion = {
        
         creador: 1,
         "titulo": this.f.titulo.value,
         "contenido": this.f.contenido.value,
         "etiquetas": "#etiquetaDePrueba",
         "seccion": 1
       } as Publicacion;
   */
    this.publicacion.titulo = this.f.titulo.value;
    this.publicacion.contenido = this.f.contenido.value;
    this.publicacion.etiquetas = this.f.etiquetas.value;
    this.publicacion.seccion = this.f.seccion.value;

    console.log(this.publicacion)
    this.posted = true;
    this.apiService.post(ApiService.createPostUrl, this.publicacion).subscribe(data => {
      debugger;
      if (data.error) {
        this.infoMsg = data.error + "";
        this.errorMsg = true;
      } else {
        this.infoMsg = "La publicación '" + this.publicacion.titulo + "' ha sido creada con éxito";
        this.errorMsg = false;
      }
    }, error => {
      this.infoMsg = error;
      this.errorMsg = true;
    })
  }

}
