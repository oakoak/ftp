import { LOCALSTORAGE_TOKEN_KEY } from '../../app.module';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginRequest, LoginResponse, RegisterResponse } from '../interfaces';
import { FormControl, ɵFormGroupValue, ɵTypedOrUntyped } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private jwtService: JwtHelperService
  ) { }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('http://localhost:8080/api/auth/signin', loginRequest).pipe(
    tap((res: LoginResponse) => localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, res.accessToken)),
    tap(() => this.toastr.success('Login Successfully','Login'))
    );
  }

  register(registerRequest: ɵTypedOrUntyped<{ firstname: FormControl<null>; password: FormControl<null>; passwordConfirm: FormControl<null>; email: FormControl<null>; username: FormControl<null>; lastname: FormControl<null> }, ɵFormGroupValue<{ firstname: FormControl<null>; password: FormControl<null>; passwordConfirm: FormControl<null>; email: FormControl<null>; username: FormControl<null>; lastname: FormControl<null> }>, any>): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>('http://localhost:8080/api/auth/signup', registerRequest).pipe(
    tap((res: RegisterResponse) => this.toastr.success('User created successfully','Register'))
    )
  }

  getLoggedInUser() {
    const decodedToken = this.jwtService.decodeToken();
    return decodedToken.user;
  }
}
