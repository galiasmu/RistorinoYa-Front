import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { IResultadoBusqueda } from '../api/models/i-resultado-busqueda';
import { BusquedaResource } from '../api/resources/busqueda-resource';

export const busquedaResolver: ResolveFn<IResultadoBusqueda[]> = (route, state) => {
  return inject(BusquedaResource).buscarLenguajeNatural({ texto: route.queryParamMap.get('texto') ?? '' });
};