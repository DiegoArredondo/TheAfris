import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Evento } from 'src/app/entities/evento';
import { ApiService } from 'src/app/services/api.service';
import { Usuario } from 'src/app/entities/usuario';
@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.scss']
})
export class RegistrarUsuarioComponent implements OnInit {
  infoMsg: string;
  errorMsg: boolean = false;

  createUserForm: FormGroup;
  submitted = false;

  posted: boolean = false;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {
    this.createUserForm=this.formBuilder.group({
      nombre:['',Validators.required],
      apellido:['',Validators.required],
      correo:['',Validators.required],
      contrasena:['',Validators.required]
    });
  }
  get f(){
    return this.createUserForm.controls;
  }

  onSubmit(){
    this.infoMsg="";
    this.errorMsg=false;
    this.submitted=true;

    if(this.createUserForm.invalid || this.posted){
      this.posted=false;
      return;
    }

  let usuario={
    "nombre": this.f.nombre.value,
    "apellidos": this.f.apellido.value,
    "correo":this.f.correo.value,
    "password1":this.f.contrasena.value,
    "password2":this.f.contrasena.value,
    "fechaNacimiento": "00/00/0000",
    "descripcion": "descripcion por mientras"
  }as Usuario;
  this.posted=true;

  this.apiService.post(ApiService.createUserUrl, usuario).subscribe(data => {
    debugger;
    if (data.error) {
      this.infoMsg = data.error + "";
      this.errorMsg = true;
    } else {
      this.infoMsg = "El usuario ha sido creado con éxito";
      this.errorMsg = false;
    }
  }, error => {
    this.infoMsg = error;
    this.errorMsg = true;
  })

  }

}
