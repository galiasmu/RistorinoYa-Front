import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PromotionModel } from '../models/promotion.model';
import { environment } from '../../../../enviroments/environment';

@Injectable({ providedIn: 'root' })
export class PromotionResource {
  private base = `${environment.apiUrl}/promotions`;

  constructor(private http: HttpClient) {}

  getVigentes(): Observable<PromotionModel[]> {
    return this.http.get<PromotionModel[]>(`${this.base}/vigentes`);
  }

  getPromotionDetail(params: {
    nroRestaurante: number;
    nroIdioma: number;
    nroContenido: number;
  }): Observable<PromotionModel> {
    const { nroRestaurante, nroIdioma, nroContenido } = params;
    return this.http.get<PromotionModel>(`${this.base}/${nroRestaurante}/${nroIdioma}/${nroContenido}`);
  }
}
