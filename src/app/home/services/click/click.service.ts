import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../enviroments/environment.development';

@Injectable({ providedIn: 'root' })
export class ClickService {
  private http = inject(HttpClient);
  private base = environment.baseUrl;

  registerClick(promotionId: number) {
    return this.http.post<{ clickId: number }>(`${this.base}/api/clicks`, { promotionId });
  }
}
