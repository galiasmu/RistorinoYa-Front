import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';

import { PromotionModel } from '../../api/models/promotion.model';
import { PromotionResource } from '../../api/resources/promotion.resource';

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

  constructor(private _route: ActivatedRoute, private _api: PromotionResource) {
  }

  loading = signal(true);
  promos = signal<PromotionModel[]>([]);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this._api.getVigentes().subscribe({
      next: (promotions: PromotionModel[]) => {
        this.promos.set(promotions);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar las promociones');
        this.loading.set(false);
      }
    });
  }
}
