import { Component, input } from '@angular/core';
import { Router } from '@angular/router';
import { IContenido } from '../../api/models/i-contenido';
import { ContenidosResource } from '../../api/resources/contenidos-resource';

@Component({
  selector: 'rs-promotion-card',
  standalone: true,
  templateUrl: './promotion-card.component.html',
  styleUrls: ['./promotion-card.component.css']
})
export class PromotionCardComponent {
  promotion = input.required<IContenido>();

  constructor(private _router: Router, private _resource: ContenidosResource) {
  }

  // Req 50: cada clic en un contenido generado por IA se registra en el portal (fee + aviso al restaurante)
  onClick(event: Event): void {
    event.stopPropagation();
    const promo = this.promotion();

    this._resource
      .registrarClick({ nroRestaurante: promo.nroRestaurante, nroIdioma: promo.nroIdioma, nroContenido: promo.nroContenido })
      .subscribe({
        next: (res) => console.log('Clic registrado, nroClick =', res.nroClick),
        // Si falla el registro igual se navega, para no cortar la navegación del usuario
        error: (err) => console.error('Error registrando el clic', err)
      });

    this._router.navigate([
      '/promotion',
      promo.nroRestaurante,
      promo.nroIdioma,
      promo.nroContenido
    ]);
  }
}
