import { Injectable } from '@angular/core';
import {
  Resource,
  ResourceHandler,
  ResourceAction,
  ResourceParams,
  ResourceRequestMethod,
  ResourceResponseBodyType,
  IResourceMethodObservable
} from '@ngx-resource/core';
import { PromotionModel } from '../models/promotion.model';
import { environment } from '../../../../enviroments/environment';

@Injectable({ providedIn: 'root' })
@ResourceParams({
  url: `${environment.apiUrl}/promotions`
})
export class PromotionResource extends Resource {
  constructor(handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({
    method: ResourceRequestMethod.Get,
    path: '/vigentes',
    responseBodyType: ResourceResponseBodyType.Json
  })
  declare getVigentes: IResourceMethodObservable<void, PromotionModel[]>;

  @ResourceAction({
    method: ResourceRequestMethod.Get,
    path: '/{!nroRestaurante}/{!nroIdioma}/{!nroContenido}',
    responseBodyType: ResourceResponseBodyType.Json
  })
  declare getPromotionDetail: IResourceMethodObservable<{
    nroRestaurante: number;
    nroIdioma: number;
    nroContenido: number;
  }, PromotionModel>;
}
