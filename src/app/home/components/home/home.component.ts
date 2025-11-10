import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { Promotion } from '../../models/promotion.model';
import { PromotionsService } from '../../services/promotions/promotion.service';
import { ClickService } from '../../services/click/click.service';

import { SidenavComponent } from '../../../shared/components/sidenav/sidenav';
import { FooterComponent } from '../../../shared/components/footer/footer';
import { PromotionCardComponent } from '../promotion-card/promotion-card.component';

@Component({
  selector: 'rs-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidenavComponent,
    FooterComponent,
    PromotionCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private promosSvc = inject(PromotionsService);
  private clicksSvc = inject(ClickService);
  private router = inject(Router);

  loading = signal(true);
  promos = signal<Promotion[]>([]);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.promosSvc.listPromotions().subscribe({
      next: res => {
        // si tu backend devuelve { content: Promotion[] }
        this.promos.set(res.content ?? []);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar las promociones');
        this.loading.set(false);
      }
    });
  }

  onOpenPromotion(p: Promotion) {
    // 1️⃣ Registrar el click (si falla, no rompemos la UX)
    this.clicksSvc.registerClick(p.id).subscribe({
      error: err => {
        console.error('Error registrando click de promoción', err);
      }
    });

    // 2️⃣ Navegar al detalle del restaurante (ajustá la ruta según tus routes)
    // Ejemplos:
    // this.router.navigate(['/restaurants', p.restaurantId]);
    // this.router.navigate(['/restaurantes', p.restaurantId]);
    // o si tu detalle está realmente en /promotions/:id, dejá como estaba:
    // this.router.navigate(['/promotions', p.id]);
    this.router.navigate(['/promotions', p.id]);
  }
}
