import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { IContenido } from '../../api/models/i-contenido';
import { ContenidosResource } from '../../api/resources/contenidos-resource';
import { PromotionCardComponent } from '../promotion-card/promotion-card.component';

@Component({
  selector: 'rs-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    PromotionCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _resource: ContenidosResource, private _router: Router) {
  }

  loading = signal(true);
  promos = signal<IContenido[]>([]);
  error = signal<string | null>(null);

  // Req 10: lo que el usuario escribe en el buscador
  buscadorForm = new FormGroup({
    texto: new FormControl('', { nonNullable: true })
  });

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

  // Req 10: lleva a /buscar?texto=..., donde el resolver hace la búsqueda con IA
  buscar(): void {
    const texto = this.buscadorForm.controls.texto.value.trim();
    if (texto) {
      this._router.navigate(['/buscar'], { queryParams: { texto } });
    }
  }
}