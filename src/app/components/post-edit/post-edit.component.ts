import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Evento } from 'src/app/entities/evento';
import { ApiService } from 'src/app/services/api.service';
import { Publicacion } from 'src/app/entities/publicacion';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {
  infoMsg: string;
  errorMsg: boolean = false;

  createPostForm: FormGroup;
  submitted = false;
 
  publicacion:Publicacion;
  posted: boolean = false;


  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router, private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if(params.get('id')){
        this.apiService.post(ApiService.getPostById, {"id":params.get('id')}).subscribe(data=>{
          debugger
          if(data){
            this.publicacion = data as Publicacion;
        
            this.f.titulo.setValue(this.publicacion.titulo)
            this.f.contenido.setValue(this.publicacion.contenido)
            this.f.seccion.setValue(this.publicacion.seccion)
          }
        }, error =>{
          this.infoMsg = error;
          this.errorMsg = true;
          return
        })
      } else {
        this.router.navigate(["listaPublicaciones"]);
        return;
      }
    });
    this.createPostForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      seccion: ['', Validators.required],
      contenido: ['', Validators.required]
    });
  }
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
        this.infoMsg = "La publicación '" + publicacion.titulo + "' ha sido creada con éxito";
        this.errorMsg = false;
      }
    }, error => {
      this.infoMsg = error;
      this.errorMsg = true;
    })
  }
}
