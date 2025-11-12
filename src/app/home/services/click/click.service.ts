// src/app/home/services/monetization/click.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ClickService {
  private http = inject(HttpClient);
  private base = environment.baseUrl; // contiene /api

  registerClick(nroRestaurante: number, nroIdioma: number, nroContenido: number) {
    return this.http.post<{ nroClick: number }>(
      `${this.base}/clicks`, // ✅ sin /api repetido
      { nroRestaurante, nroIdioma, nroContenido, nroCliente: null }
    );
  }
}
