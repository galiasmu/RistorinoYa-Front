import { Component, Input, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReservasResource } from '../../api/resources/reservas-resource';
import { IReservaCliente } from '../../api/models/i-reserva';
import { IEstadoReserva } from '../../api/models/i-estado-reserva';
import { MapaPipe } from '../../../shared/pipes/mapa-pipe';

@Component({
  selector: 'app-mis-reservas-page',
  imports: [ReactiveFormsModule, MapaPipe],
  templateUrl: './mis-reservas-page.html'
})
export class MisReservasPage implements OnInit {
  @Input() estados: IEstadoReserva[] = [];

  reservas = signal<IReservaCliente[]>([]);

  filtroForm = new FormGroup({
    fechaDesde: new FormControl<string>('', { nonNullable: true }),
    fechaHasta: new FormControl<string>('', { nonNullable: true }),
    codEstado: new FormControl<number | null>(null)
  });

  constructor(private _resource: ReservasResource) { }

  ngOnInit(): void {
    this.buscar();
  }

  buscar(): void {
    const datos = this.filtroForm.getRawValue();
    const filtros: { codEstado?: number, fechaDesde?: string, fechaHasta?: string } = {};
    if (datos.codEstado) {
      filtros.codEstado = datos.codEstado;
    }
    if (datos.fechaDesde) {
      filtros.fechaDesde = datos.fechaDesde;
    }
    if (datos.fechaHasta) {
      filtros.fechaHasta = datos.fechaHasta;
    }
    this._resource.getReservas(filtros).subscribe((reservas: IReservaCliente[]) => this.reservas.set(reservas));
  }
}
