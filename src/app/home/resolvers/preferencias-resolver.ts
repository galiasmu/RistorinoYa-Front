import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { IValorPreferencia } from '../api/models/i-valor-preferencia';
import { CatalogoResource } from '../api/resources/catalogo-resource';

export const preferenciasResolver: ResolveFn<IValorPreferencia[]> = (route, state) => {
  return inject(CatalogoResource).getPreferencias();
};
