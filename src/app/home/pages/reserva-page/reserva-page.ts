import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import type { IResourceResponse } from '@ngx-resource/core';
import { RestaurantesResource } from '../../api/resources/restaurantes-resource';
import { ReservasResource } from '../../api/resources/reservas-resource';
import { AuthService } from '../../../core/services/auth-service';
import { ISucursal } from '../../api/models/i-sucursal';
import { IDisponibilidad } from '../../api/models/i-disponibilidad';
import { IReservaResponse } from '../../api/models/i-reserva';
import { MapaPipe } from '../../../shared/pipes/mapa-pipe';

@Component({
  selector: 'app-reserva-page',
  imports: [ReactiveFormsModule, RouterModule, MapaPipe],
  templateUrl: './reserva-page.html'
})
export class ReservaPage implements OnInit {
  @Input() nroSucursal!: string;
  @Input() sucursales: ISucursal[] = [];

  sucursal!: ISucursal;
  hoy = new Date().toISOString().substring(0, 10);

  reservaForm = new FormGroup({
    fecha: new FormControl<string>(this.hoy, { nonNullable: true, validators: [Validators.required] }),
    adultos: new FormControl<number>(2, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
    menores: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] })
  });

  disponibilidad = signal<IDisponibilidad[]>([]);
  turnoElegido = signal<IDisponibilidad | null>(null);
  reserva = signal<IReservaResponse | null>(null);
  mensaje = signal<string | null>(null);

  zonas = computed(() => [...new Set(this.disponibilidad().map(d => d.nomZona))]);

  private motivos: Record<string, string> = {
    SIN_DISPONIBILIDAD: $localize`Ya no hay lugar en ese turno. Elegí otro.`,
    MENORES_NO_PERMITIDOS: $localize`Esa zona o turno no admite menores.`,
    FECHA_PASADA: $localize`Ese turno ya no se puede reservar (fecha pasada o fuera de la anticipación mínima).`
  };

  constructor(private _restaurantes: RestaurantesResource, private _reservas: ReservasResource,
              private _auth: AuthService, private _router: Router) { }

  get logueado(): boolean {
    return this._auth.logueado();
  }

  ngOnInit(): void {
    this.sucursal = this.sucursales.find(s => s.nroSucursal === Number(this.nroSucursal))!;

    // Si se vuelve del login, se retoma la reserva que se estaba por confirmar
    const pendiente = sessionStorage.getItem('reservaPendiente');
    if (pendiente) {
      sessionStorage.removeItem('reservaPendiente');
      const datos = JSON.parse(pendiente);
      this.reservaForm.patchValue(datos);
      this.consultarDisponibilidad(datos.codZona, datos.horaDesde);
    }
  }

  turnosDe(zona: string): IDisponibilidad[] {
    return this.disponibilidad().filter(d => d.nomZona === zona);
  }

  // Req 14/37: la grilla se consulta en tiempo real al restaurante
  consultarDisponibilidad(codZona?: number, horaDesde?: string): void {
    const datos = this.reservaForm.getRawValue();
    this.turnoElegido.set(null);
    this._restaurantes.getDisponibilidad({
      nroRestaurante: this.sucursal.nroRestaurante,
      nroSucursal: this.sucursal.nroSucursal,
      fecha: datos.fecha,
      adultos: datos.adultos,
      menores: datos.menores
    }).subscribe((disponibilidad: IDisponibilidad[]) => {
      this.disponibilidad.set(disponibilidad);
      this.turnoElegido.set(disponibilidad.find(d => d.codZona === codZona && d.horaDesde === horaDesde && d.disponible) ?? null);
    });
  }

  // Req 15/38: requiere sesión; el portal la registra en el restaurante y devuelve el código
  confirmarReserva(): void {
    const turno = this.turnoElegido()!;
    const datos = this.reservaForm.getRawValue();

    if (!this.logueado) {
      sessionStorage.setItem('reservaPendiente', JSON.stringify({ ...datos, codZona: turno.codZona, horaDesde: turno.horaDesde }));
      this._router.navigate(['/login'], { queryParams: { returnUrl: this._router.url } });
      return;
    }

    this.mensaje.set(null);
    this._reservas.confirmarReserva({
      nroRestaurante: this.sucursal.nroRestaurante,
      nroSucursal: this.sucursal.nroSucursal,
      codZona: turno.codZona,
      fecha: turno.fecha,
      hora: turno.horaDesde,
      cantAdultos: datos.adultos,
      cantMenores: datos.menores
    }).subscribe({
      next: (reserva: IReservaResponse) => this.reserva.set(reserva),
      error: (error: IResourceResponse) => {
        this.mensaje.set(this.motivos[error.body?.motivo] ?? $localize`El restaurante no pudo registrar la reserva.`);
        this.consultarDisponibilidad();
      }
    });
  }
}
