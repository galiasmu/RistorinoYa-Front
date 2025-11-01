import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { Promotion } from '../../models/promotion.model';
import {PromotionsService} from '../../services/promotions/promotion.service';
import {MonetizationService} from '../../services/monetization/monetization.service';
@Component({
  selector: 'rs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private promotionsSvc = inject(PromotionsService);
  private monetizationSvc = inject(MonetizationService);
  private router = inject(Router);

  loading = true;
  errorMsg = '';
  promotions$ = this.promotionsSvc.getPromotions().pipe(
    tap(() => (this.loading = false)),
    catchError(err => {
      this.errorMsg = 'No pudimos cargar las promociones. Intenta nuevamente.';
      this.loading = false;
      console.error('getPromotions error', err);
      return of<Promotion[]>([]);
    })
  );

  openPromotion(promo: Promotion): void {
    // 1) Registrar el click para monetización (sincrónico pero sin bloquear la UX)
    this.monetizationSvc.registerClick({ promotionId: promo.id, source: 'home' })
      .pipe(
        catchError(err => {
          // No bloquear la navegación; solo loguear
          console.warn('Monetization failed (continuing navigation)', err);
          return of(void 0);
        })
      )
      .subscribe(() => {
        // 2) Navegar al detalle del restaurante
        this.router.navigate(['/restaurantes', promo.restaurantId]);
      });
  }

  trackByPromoId(_i: number, p: Promotion) { return p.id; }
}
