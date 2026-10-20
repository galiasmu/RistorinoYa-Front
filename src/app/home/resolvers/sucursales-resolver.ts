import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ISucursal } from '../api/models/i-sucursal';
import { RestaurantesResource } from '../api/resources/restaurantes-resource';

export const sucursalesResolver: ResolveFn<ISucursal[]> = (route, state) => {
  return inject(RestaurantesResource).getSucursales({ nroRestaurante: Number(route.params['nroRestaurante']) });
};
