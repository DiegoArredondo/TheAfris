import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Evento } from 'src/app/entities/evento';
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


  time: String;


  posted: boolean = false;


  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
   
  }

  ngOnInit(): void {
    this.createPostForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      seccion: ['', Validators.required],
      contenido: ['', Validators.required]
    });
  }

  // Un getter conveniente para un fácil acceso a los datos de los campos del formulario
  get f() { return this.createPostForm.controls; }

  onSubmit(){
    this.infoMsg = "";
    this.errorMsg = false;
    this.submitted = true;

    // Se detiene aquí si el formulario es inválido 
    if (this.createPostForm.invalid || this.posted) {
      this.posted = false;
      return;
    }

    let publicacion = {
      creador: 1,
      "titulo": this.f.titulo.value,
      "contenido": this.f.contenido.value,
      "etiquetas": "#etiquetaDePrueba",
      "seccion": 1
    } as Publicacion;

    this.posted = true;
    
    this.apiService.post(ApiService.createPostUrl, publicacion).subscribe(data => {
      debugger;
      if (data.error) {
        this.infoMsg = data.error + "";
        this.errorMsg = true;
      } else {
        this.infoMsg = "La publicación '" + publicacion.titulo + "' ha sido actualizada con éxito";
        this.errorMsg = false;
      }
    }, error => {
      this.infoMsg = error;
      this.errorMsg = true;
    })
  }

}
