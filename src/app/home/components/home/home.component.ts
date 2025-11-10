import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { PromotionDTO } from '../../models/promotion.model';
import {PromotionService} from '../../services/promotions/promotion.service';
import { ClickService } from '../../services/click/click.service';

import {SidenavComponent} from '../../../shared/components/sidenav/sidenav';
import {FooterComponent} from '../../../shared/components/footer/footer';

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
  private promosSvc = inject(PromotionService);
  private clicksSvc = inject(ClickService);
  private router = inject(Router);

  loading = signal(true);
  promos = signal<PromotionDTO[]>([]);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.promosSvc.getVigentes().subscribe({
      next: (promotions: PromotionDTO[]) => {
        this.promos.set(promotions);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar las promociones');
        this.loading.set(false);
      }
    });
  }


  onOpenPromotion(p: PromotionDTO) {
    // 1️⃣ Registrar el clic
    this.clicksSvc.registerClick(p.nroContenido).subscribe({ error: () => {} });

    // 2️⃣ Navegar al detalle de la promoción
    this.router.navigate(['/promotions', p.nroContenido]);
  }
}
