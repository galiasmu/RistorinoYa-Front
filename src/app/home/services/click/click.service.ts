// src/app/home/services/monetization/click.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../enviroments/environment';

@Injectable({ providedIn: 'root' })
export class ClickService {
  private http = inject(HttpClient);
  private base = environment.baseUrl;

  registerClick(nroRestaurante: number, nroIdioma: number, nroContenido: number) {
    return this.http.post<{ clickId: number }>(
      `${this.base}/api/clicks`,
      { nroRestaurante, nroIdioma, nroContenido }
    );
  }
}
