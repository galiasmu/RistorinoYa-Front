import {Injectable, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../enviroments/environment.development';
import { Observable } from 'rxjs';
import { Promotion } from '../../models/promotion.model';
import { Restaurant } from '../../models/restaurant.model';

@Injectable({ providedIn: 'root' })
export class PromotionsService {
  private http = inject(HttpClient);
  private base = environment.baseUrl;

  listPromotions(): Observable<{ content: Promotion[] }> {
    return this.http.get<{ content: Promotion[] }>(`${this.base}/api/promotions`);
  }

  getRestaurant(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.base}/api/restaurants/${id}`);
  }
}
