import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import Planta from '../models/planta';

@Injectable({
  providedIn: 'root'
})
export class PlantaService {

  private url = environment.url + environment.prefix + environment.plantas;
  datos: Planta[] = [];

  constructor(private http: HttpClient) { }

  getPlanta(id: number): Observable<Planta> {
    return this.http.get<Planta>(`${this.url}/${id}`);
  }

  getPlantas(): Observable<Planta[]> {
    return this.http.get<Planta[]>(`${this.url}`);
  }

  crearPlanta(planta: Planta): Observable<Planta> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Planta>(`${this.url}`, planta, {headers})
  }

  modificarPlanta(id: number, planta: Planta): Observable<Planta> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put<Planta>(`${this.url}/${id}`, planta, {headers})
  }

  eliminarPlanta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  getLecturas(): Observable<number> {
    return this.http.get<number>(`${this.url}/lecturas`);
  }

  getAlertasMedias(): Observable<number> {
    return this.http.get<number>(`${this.url}/alertas-medias`);
  }

  getAlertasRojas(): Observable<number> {
    return this.http.get<number>(`${this.url}/alertas-rojas`);
  }

  getSensoresDeshabilitados(): Observable<number> {
    return this.http.get<number>(`${this.url}/sensores-deshabilitados`);
  }

  verificarNombre(nombre: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/verificar-nombre?nombre=${nombre}`);
  }

}
