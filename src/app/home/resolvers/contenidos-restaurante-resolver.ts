import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { IContenido } from '../api/models/i-contenido';
import { ContenidosResource } from '../api/resources/contenidos-resource';

export const contenidosRestauranteResolver: ResolveFn<IContenido[]> = (route, state) => {
  return inject(ContenidosResource).getContenidos({ nroRestaurante: Number(route.params['nroRestaurante']) });
};
