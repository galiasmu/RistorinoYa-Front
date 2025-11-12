import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ClickService } from '../services/click/click.service';

export const clickResolver: ResolveFn<{ nroClick: number }> = (route, state) => {
  const nroRestaurante = Number(route.params['nroRestaurante']);
  const nroIdioma = Number(route.params['nroIdioma']);
  const nroContenido = Number(route.params['nroContenido']);

  console.log('Click resolver params:', { nroRestaurante, nroIdioma, nroContenido });

  return inject(ClickService).registerClick(nroRestaurante, nroIdioma, nroContenido);
};
