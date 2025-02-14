import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteservicioService {
  private apiUrl = 'http://localhost:5000/clientes'; // Cambia esto por tu API real

  constructor(private http: HttpClient) {}

  // Obtener todos los clientes
  getClientes(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Obtener un cliente por ID
  getClienteById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo cliente
  // createCliente(cliente: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}`, cliente);
  // }

  createCliente(cliente: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, cliente, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
  

  // Actualizar un cliente existente
  updateCliente(id: number, cliente: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, cliente);
  }

  // Eliminar un cliente
  deleteCliente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
