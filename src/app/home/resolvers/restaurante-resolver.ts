import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { IRestaurante } from '../api/models/i-restaurante';
import { RestaurantesResource } from '../api/resources/restaurantes-resource';

export const restauranteResolver: ResolveFn<IRestaurante> = (route, state) => {
  return inject(RestaurantesResource).getRestaurante({ nroRestaurante: Number(route.params['nroRestaurante']) });
};
