import { Routes } from '@angular/router';
import {UsersListComponent} from "./users-list/users-list.component";
import {AppComponent} from "./app.component";

export const routes: Routes = [
  {path:'users', component:UsersListComponent},
  {path:'', component:AppComponent}
];
