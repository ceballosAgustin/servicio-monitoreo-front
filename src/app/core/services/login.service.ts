import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map, Observable } from 'rxjs';
import Usuario from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = environment.url;
  private prefix: string = environment.prefix;
  private prefixAuth: string = environment.prefixAuth;
  private loginUrl: string = environment.login;
  private registroUrl: string = environment.registro;
  private userData = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.userData.next(localStorage.getItem('authToken') || '');
  }

  login(email: string, clave: string): Observable<{token: string, email: string, nombre: string}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {email, clave};

    return this.http.post<{token: string, email: string, nombre: string}>
    (this.url + this.prefixAuth + this.loginUrl, body, {headers})
    .pipe(map(response => {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('email', response.email);
      localStorage.setItem('nombre', response.nombre);
      console.log('Token guardado en localStorage:', response.token);
      return response;
    }))
  }

  registro(usuario: {email: string; clave: string; nombre: string; apellido: string;}):
  Observable<Usuario> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<Usuario>(this.url + this.prefixAuth + this.registroUrl, usuario, {headers});
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  logout(): void {
    localStorage.clear();
  }

}
