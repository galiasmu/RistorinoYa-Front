import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { PromotionModel } from '../api/models/promotion.model';
import { PromotionResource } from '../api/resources/promotion.resource';

export const promotionResolver: ResolveFn<PromotionModel> = (
  route,
  state
): Observable<PromotionModel> => {
  const promotionResource = inject(PromotionResource);

  const nroRestaurante = Number(route.paramMap.get('nroRestaurante'));
  const nroIdioma = Number(route.paramMap.get('nroIdioma'));
  const nroContenido = Number(route.paramMap.get('nroContenido'));

  return promotionResource.getPromotionDetail({
    nroRestaurante,
    nroIdioma,
    nroContenido
  });
};
