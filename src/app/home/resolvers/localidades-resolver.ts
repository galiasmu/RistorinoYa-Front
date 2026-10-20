import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ILocalidad } from '../api/models/i-localidad';
import { CatalogoResource } from '../api/resources/catalogo-resource';

export const localidadesResolver: ResolveFn<ILocalidad[]> = (route, state) => {
  return inject(CatalogoResource).getLocalidades();
};
