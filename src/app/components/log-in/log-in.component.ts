import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Evento } from 'src/app/entities/evento';
import { ApiService } from 'src/app/services/api.service';
import { LoguedUsuario } from 'src/app/entities/usuariologued';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  infoMsg: string;
  errorMsg: boolean = false;

  logInUserForm: FormGroup;
  submitted = false;

  posted: boolean = false;
  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {
    this.logInUserForm=this.formBuilder.group({
      correo:['',Validators.required],
      contrasena:['',Validators.required]
    });
  }
  get f(){
    return this.logInUserForm.controls;
  }

  onSubmit(){
    this.infoMsg="";
    this.errorMsg=false;
    this.submitted=true;

    if(this.logInUserForm.invalid || this.posted){
      this.posted=false;
      return;
    }


    let usuario={
      "correo":this.f.correo.value,
      "password":this.f.contrasena.value
    }as LoguedUsuario;
    this.posted=true;
  
    this.apiService.post(ApiService.logInUserUrl, usuario).subscribe(data => {
      debugger;
      if (data.error) {
        this.infoMsg = data.error + "";
        this.errorMsg = true;
      } else {
        this.infoMsg = "Haz iniciado sesión";
        this.errorMsg = false;
      }
    }, error => {
      this.infoMsg = error;
      this.errorMsg = true;
    })
  
  }

}
