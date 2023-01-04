import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FileManagerModule} from './file-manager/file-manager.module'
import {FileManagerComponent} from './file-manager/file-manager.component'
import {AppComponent} from "./app.component";
import {AuthenticationModule} from "./authentication/authentication.module";
import {AuthGuard} from "./guard/auth.guard";

const routes: Routes = [
  {
    path:"test",
    canActivate: [AuthGuard],
    component: FileManagerComponent
  },
  {
    path: "auth",
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    // Redirects all paths that are not matching to the 'public' route/path
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
