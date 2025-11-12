import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PromotionModel } from '../api/models/promotion.model';
import { PromotionResource } from '../api/resources/promotion.resource';

export const promotionResolver: ResolveFn<PromotionModel> = (route, state) => {
  return inject(PromotionResource).getPromotionDetail({
    nroRestaurante: Number(route.params['nroRestaurante']),
    nroIdioma: Number(route.params['nroIdioma']),
    nroContenido: Number(route.params['nroContenido'])
  });
};
