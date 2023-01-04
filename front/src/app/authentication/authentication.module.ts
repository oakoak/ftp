import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AuthenticationRoutingModule} from './authentication-routing.module'

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthService} from './auth-service/auth.service'
import { MatCardModule } from "@angular/material/card";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    AuthenticationRoutingModule,
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterLink,
    MatInputModule,
    MatSnackBarModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthenticationModule { }
