import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Usuario from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url: string = environment.url + environment.prefix;

  constructor(private http: HttpClient) { }

  getUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}/usuario`);
  }
}
