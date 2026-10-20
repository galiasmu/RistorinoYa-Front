import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import type { IRestaurante } from '../../api/models/i-restaurante';
import { IPreferenciaSucursal, ISucursal, IZona } from '../../api/models/i-sucursal';
import { IContenido } from '../../api/models/i-contenido';
import { MapaPipe } from '../../../shared/pipes/mapa-pipe';

@Component({
  selector: 'app-restaurante-page',
  imports: [ReactiveFormsModule, RouterModule, MapaPipe],
  templateUrl: './restaurante-page.html'
})
export class RestaurantePage {
  @Input() restaurante!: IRestaurante;
  @Input() sucursales: ISucursal[] = [];
  @Input() contenidos: IContenido[] = [];

  filtroBarrio = new FormControl<string>('', { nonNullable: true });

  get barrios(): string[] {
    return [...new Set(this.sucursales.map(s => s.barrio))];
  }

  get sucursalesFiltradas(): ISucursal[] {
    return this.filtroBarrio.value
      ? this.sucursales.filter(s => s.barrio === this.filtroBarrio.value)
      : this.sucursales;
  }

  preferenciasDe(sucursal: ISucursal): IPreferenciaSucursal[] {
    return JSON.parse(sucursal.preferencias || '[]');
  }

  zonasDe(sucursal: ISucursal): IZona[] {
    return JSON.parse(sucursal.zonas || '[]');
  }
}
