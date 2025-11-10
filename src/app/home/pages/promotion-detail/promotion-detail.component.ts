import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {PromotionService} from '../../services/promotions/promotion.service';
import { PromotionDTO } from '../../models/promotion.model';
import { Restaurant } from '../../models/restaurant.model';

import {SidenavComponent} from '../../../shared/components/sidenav/sidenav';
import {FooterComponent} from '../../../shared/components/footer/footer';

@Component({
  selector: 'rs-promotion-detail',
  standalone: true,
  imports: [CommonModule, RouterModule,SidenavComponent,
    FooterComponent,],
  templateUrl: './promotion-detail.component.html',
  styleUrls: ['./promotion-detail.component.css']
})
export class PromotionDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private promosSvc = inject(PromotionService);

  restaurant = signal<Restaurant | null>(null);
  loading = signal(true);

  promotion = signal<PromotionDTO | null>(null);

  ngOnInit(): void {
    const nroRestaurante = Number(this.route.snapshot.paramMap.get('nroRestaurante'));
    const nroIdioma = Number(this.route.snapshot.paramMap.get('nroIdioma'));
    const nroContenido = Number(this.route.snapshot.paramMap.get('nroContenido'));

    if (!nroRestaurante || !nroIdioma || !nroContenido) {
      this.router.navigateByUrl('/');
      return;
    }

    this.promosSvc.getPromotionById(nroRestaurante, nroIdioma, nroContenido).subscribe({
      next: promo => {
        this.promotion.set(promo);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }



  goBack() {
    this.router.navigateByUrl('/');
  }
}
