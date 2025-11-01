import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MonetizationClick {
  promotionId: number;
  occurredAt?: string;
  source?: string; // Ej: 'home', 'banner', etc.
}

@Injectable({ providedIn: 'root' })
export class MonetizationService {
  private http = inject(HttpClient);
  private baseUrl = '/api';

  registerClick(payload: MonetizationClick): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/monetizations`, payload);
  }
}
