import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FileManagerComponent} from './file-manager/file-manager.component'
import {AuthGuard} from "./guard/auth.guard";

const routes: Routes = [
  {
    path:"home",
    canActivate: [AuthGuard],
    component: FileManagerComponent
  },
  {
    path: "auth",
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
