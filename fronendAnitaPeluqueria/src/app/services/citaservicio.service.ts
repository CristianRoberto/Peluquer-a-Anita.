import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitaservicioService {
 private apiUrl = 'http://localhost:5000/citas'; 

  constructor(private http: HttpClient) {}

  // Obtener todos los citas
  getcitas(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Obtener un cita por ID
  getcitaById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo cita
  // createcita(cita: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}`, cita);
  // }

  createcita(cita: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, cita, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
  

  // Actualizar un cita existente
  updatecita(id: number, cita: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, cita);
  }

  // Eliminar un cita
  deletecita(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
