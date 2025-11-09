import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {PromotionsService} from '../../services/promotions/promotion.service';
import { Promotion } from '../../models/promotion.model';
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
  private promosSvc = inject(PromotionsService);

  promotion = signal<Promotion | null>(null);
  restaurant = signal<Restaurant | null>(null);
  loading = signal(true);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.router.navigateByUrl('/');
      return;
    }

    this.promosSvc.getPromotionFromList(id).subscribe({
      next: promo => {
        this.promotion.set(promo);
        this.loading.set(false);

        if (promo && promo.restaurantId) {
          this.promosSvc.getRestaurant(promo.restaurantId).subscribe({
            next: r => this.restaurant.set(r),
            error: () => {}
          });
        }
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
