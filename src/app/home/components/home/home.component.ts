import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IContenido } from '../../api/models/i-contenido';
import { ContenidosResource } from '../../api/resources/contenidos-resource';
import { PromotionCardComponent } from '../promotion-card/promotion-card.component';

@Component({
  selector: 'rs-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PromotionCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _resource: ContenidosResource) {
  }

  loading = signal(true);
  promos = signal<IContenido[]>([]);
  error = signal<string | null>(null);

  // Req 12: promociones vigentes en la portada
  ngOnInit(): void {
    this._resource.getContenidos().subscribe({
      next: (contenidos: IContenido[]) => {
        this.promos.set(contenidos);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar las promociones');
        this.loading.set(false);
      }
    });
  }
}
