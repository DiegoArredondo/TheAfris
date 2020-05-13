import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { EventCreationComponent } from './components/event-creation/event-creation.component';
import { EventEditComponent } from './components/event-edit/event-edit.component';
import { PostCreationComponent } from './components/post-creation/post-creation.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { ListaPublicacionesComponent } from './components/lista-publicaciones/lista-publicaciones.component';
import { ListaEventosComponent } from './components/lista-eventos/lista-eventos.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { HomeComponent } from './components/home/home.component';
import {AllPostsComponent} from './components/all-posts/all-posts.component';
import {AllEventsComponent} from './components/all-events/all-events.component';
import {PostViewComponent} from './components/post-view/post-view.component';
import{EventViewComponent} from './components/event-view/event-view.component';
const routes: Routes = [
  {path:"crearEvento", component: EventCreationComponent} as Route,
  {path:"editarEvento", component: EventEditComponent} as Route,
  {path:"listaEventos", component: ListaEventosComponent} as Route,
  {path:"crearPublicacion", component: PostCreationComponent} as Route,
  {path:"editarPublicacion", component: PostEditComponent} as Route,
  {path:"listaPublicaciones", component: ListaPublicacionesComponent} as Route,
  {path:"iniciarSesion", component: LogInComponent} as Route,
  {path:"registrarUsuario", component: RegistrarUsuarioComponent} as Route,
  {path:"home", component: HomeComponent} as Route,
  {path:"", component: HomeComponent} as Route,
  {path:"publicaciones", component: AllPostsComponent} as Route,
  {path:"eventos", component:AllEventsComponent} as Route,
  {path:"publicacion",component:PostViewComponent} as Route,
  {path:"evento",component:EventViewComponent} as Route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
