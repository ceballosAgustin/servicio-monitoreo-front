import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import Pais from '../models/pais';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  private apiUrl = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient) {}

  obtenerPaises(): Observable<Pais[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(paises =>
        paises.map((pais: any) => ({
          nombre: pais.name.common,
          bandera: pais.flags.svg,
        }))
      )
    );
  }
}

