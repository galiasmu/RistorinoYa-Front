import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClickService {
  private apiUrl = 'http://localhost:8080/api/clicks'; // 👈 apuntamos al backend Spring Boot

  constructor(private http: HttpClient) {}

  registerClick(
    nroRestaurante: number,
    nroIdioma: number,
    nroContenido: number,
    nroCliente: number | null = null
  ): Observable<{ nroClick: number }> {
    const body = {
      nroRestaurante,
      nroIdioma,
      nroContenido,
      nroCliente
    };

    return this.http.post<{ nroClick: number }>(this.apiUrl, body);
  }
}
