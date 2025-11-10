import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PromotionDTO } from '../../models/promotion.model';

@Injectable({ providedIn: 'root' })
export class PromotionService {
  private apiUrl = 'http://localhost:8080/api/promotions';

  constructor(private http: HttpClient) {}

  getVigentes(desde?: string, hasta?: string): Observable<PromotionDTO[]> {
    let params = new HttpParams();
    if (desde) params = params.set('desde', desde);
    if (hasta) params = params.set('hasta', hasta);
    return this.http.get<PromotionDTO[]>(`${this.apiUrl}/vigentes`, { params });
  }

  getPromotionById(nroRestaurante: number, nroIdioma: number, nroContenido: number): Observable<PromotionDTO> {
    return this.http.get<PromotionDTO>(`${this.apiUrl}/${nroRestaurante}/${nroIdioma}/${nroContenido}`);
  }


}
