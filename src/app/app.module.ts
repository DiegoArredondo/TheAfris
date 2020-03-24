import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { EventCreationComponent } from './components/event-creation/event-creation.component';
import { EventEditComponent } from './components/event-edit/event-edit.component';
import { PostCreationComponent } from './components/post-creation/post-creation.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { FooterComponent } from './components/utils/footer/footer.component';
import { HeaderComponent } from './components/utils/header/header.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {MatNativeDateModule} from '@angular/material/core';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MaterialModule } from './material.module';

import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    EventCreationComponent,
    EventEditComponent,
    PostCreationComponent,
    PostEditComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MaterialModule,
    NgxMaterialTimepickerModule.setLocale('es-419')
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
