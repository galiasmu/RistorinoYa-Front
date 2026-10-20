import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { map } from 'rxjs';
import { IContenido } from '../api/models/i-contenido';
import { ContenidosResource } from '../api/resources/contenidos-resource';

// El portal no tiene un GET por id: se traen los contenidos del restaurante y se elige el pedido
export const promotionResolver: ResolveFn<IContenido | undefined> = (route, state) => {
  const nroRestaurante = Number(route.params['nroRestaurante']);
  const nroIdioma = Number(route.params['nroIdioma']);
  const nroContenido = Number(route.params['nroContenido']);

  return inject(ContenidosResource).getContenidos({ nroRestaurante }).pipe(
    map(contenidos => contenidos.find(c => c.nroIdioma === nroIdioma && c.nroContenido === nroContenido))
  );
};
