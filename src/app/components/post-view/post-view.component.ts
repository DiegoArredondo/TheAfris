import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Evento } from 'src/app/entities/evento';
import { ApiService } from 'src/app/services/api.service';
import { Publicacion } from 'src/app/entities/publicacion';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {

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

}
