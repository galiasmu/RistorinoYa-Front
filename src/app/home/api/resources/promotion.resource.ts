import { Injectable } from '@angular/core';
import {
  Resource,
  ResourceAction,
  ResourceParams,
  ResourceRequestMethod,
  ResourceResponseBodyType,
  ResourceHandler,
} from '@ngx-resource/core';
import type { IResourceMethodObservable } from '@ngx-resource/core'; // <-- type-only
import type { PromotionModel } from '../models/promotion.model';     // <-- type-only
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
@ResourceParams({
  url: `${environment.apiUrl}`
})
export class PromotionResource extends Resource {
  constructor(handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({
    method: ResourceRequestMethod.Get,
    path: '/promotions',
    responseBodyType: ResourceResponseBodyType.Json
  })
  getVigentes!: IResourceMethodObservable<void, PromotionModel[]>;

  @ResourceAction({
    method: ResourceRequestMethod.Get,
    path: '/promotions/{!nroRestaurante}/{!nroIdioma}/{!nroContenido}',
    responseBodyType: ResourceResponseBodyType.Json
  })
  getPromotionDetail!: IResourceMethodObservable<{
    nroRestaurante: number;
    nroIdioma: number;
    nroContenido: number;
  }, PromotionModel>;
}
