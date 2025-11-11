import { Component, input, inject } from '@angular/core';
import { Router } from '@angular/router';
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



  onClick(event: Event): void {
    event.stopPropagation();
    const promo = this.promotion();

    // Navigate with resolver-compatible parameters
    this.router.navigate([
      '/promotion',
      promo.nroRestaurante,
      promo.nroIdioma,
      promo.nroContenido
    ]);
  }
}
