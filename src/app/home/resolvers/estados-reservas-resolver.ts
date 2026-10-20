import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { IEstadoReserva } from '../api/models/i-estado-reserva';
import { CatalogoResource } from '../api/resources/catalogo-resource';

export const estadosReservasResolver: ResolveFn<IEstadoReserva[]> = (route, state) => {
  return inject(CatalogoResource).getEstadosReservas();
};
