import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ClickService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  registerClick(nroRestaurante: number, nroIdioma: number, nroContenido: number) {
    const params = new HttpParams()
      .set('nroRestaurante', nroRestaurante.toString())
      .set('nroIdioma', nroIdioma.toString())
      .set('nroContenido', nroContenido.toString());

    console.log('Sending click request with params:', params.toString());

    return this.http.post<{ nroClick: number }>(
      `${this.base}/clicks`,
      null, // No body
      { params }
    );
  }
}
