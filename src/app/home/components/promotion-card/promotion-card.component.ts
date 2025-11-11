import { Component, input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PromotionDTO } from '../../models/promotion.model';
import { ClickService } from '../../services/click/click.service';

@Component({
  selector: 'rs-promotion-card',
  standalone: true,
  templateUrl: './promotion-card.component.html',
  styleUrls: ['./promotion-card.component.css']
})
export class PromotionCardComponent {
  promotion = input.required<PromotionDTO>();
  private router = inject(Router);
  private clicksSvc = inject(ClickService); // 👈 agregado

  onClick(event: Event): void {
    event.stopPropagation();
    const promo = this.promotion();

    // 1️⃣ Registrar el click en el backend
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

    // 2️⃣ Navegar como ya lo hacías
    this.router.navigate(
      ['/promotion', promo.nroRestaurante, promo.nroIdioma, promo.nroContenido]
    ).then(success => {
      console.log('Navigation successful?', success);
    });
  }
}
