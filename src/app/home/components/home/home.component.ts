import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {PromotionsService} from '../../services/promotions/promotion.service';
import {ClickService} from '../../services/click/click.service';
import { Promotion } from '../../models/promotion.model';

@Component({
  selector: 'rs-home',
  standalone: false, // (seguimos con NgModule, no standalone)
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
      next: res => { this.promos.set(res.content ?? []); this.loading.set(false); },
      error: err => { this.error.set('No se pudieron cargar las promociones'); this.loading.set(false); }
    });
  }

  onOpenPromotion(p: Promotion) {
    // 1) Registrar clic (asincrónico)
    this.clicksSvc.registerClick(p.id).subscribe({ error: () => {} });
    // 2) Navegar a detalle de restaurante (opcional)
    this.router.navigate(['/restaurantes', p.restaurantId]);
  }
}
