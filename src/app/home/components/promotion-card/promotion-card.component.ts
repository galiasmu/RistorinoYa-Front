import { Component, input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ClickService } from '../../services/click/click.service';
import { PromotionModel } from '../../api/models/promotion.model';

@Component({
  selector: 'rs-promotion-card',
  standalone: true,
  templateUrl: './promotion-card.component.html',
  styleUrls: ['./promotion-card.component.css']
})
export class PromotionCardComponent {
  promotion = input.required<PromotionModel>();
  private router = inject(Router);
  private clicksSvc = inject(ClickService); // 👈 agregado

  onClick(event: Event): void {
    event.stopPropagation();
    const promo = this.promotion();

    this.clicksSvc
      .registerClick(promo.nroRestaurante, promo.nroIdioma, promo.nroContenido)
      .subscribe({
        next: (res) => {
          console.log('Click registrado, nroClick =', res.nroClick);
        },
        error: (err) => {
          console.error('Error registrando click', err);
          // igual navegamos, no queremos romper la UX
        }
      });

    this.router.navigate([
      '/promotion',
      promo.nroRestaurante,
      promo.nroIdioma,
      promo.nroContenido
    ]);
  }
}
