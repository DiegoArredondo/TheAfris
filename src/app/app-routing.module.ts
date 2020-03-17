import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { EventCreationComponent } from './components/event-creation/event-creation.component';
import { EventEditComponent } from './components/event-edit/event-edit.component';
import { PostCreationComponent } from './components/post-creation/post-creation.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';


const routes: Routes = [
  {path:"crearEvento", component: EventCreationComponent} as Route,
  {path:"editarEvento", component: EventEditComponent} as Route,
  {path:"crearPublicacion", component: PostCreationComponent} as Route,
  {path:"editarPublicacion", component: PostEditComponent} as Route,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
