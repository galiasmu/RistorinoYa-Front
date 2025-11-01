import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Promotion } from '../../models/promotion.model';
import { Restaurant } from '../../models/restaurant.model';

@Injectable({ providedIn: 'root' })
export class PromotionsService {
  private http = inject(HttpClient);
  private baseUrl = '/api';

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(`${this.baseUrl}/promotions`).pipe(map(x => x ?? []));
  }

  getRestaurantById(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.baseUrl}/restaurants/${id}`);
  }
}
