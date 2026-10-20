import { Injectable } from '@angular/core';
import { Resource, ResourceAction, ResourceHandler, ResourceParams, ResourceRequestBodyType, ResourceRequestMethod, ResourceResponseBodyType } from '@ngx-resource/core';
import type { IResourceMethodObservable } from '@ngx-resource/core';
import { IContenido } from '../models/i-contenido';
import { environment } from '../../../../environments/environment';

@Injectable()
@ResourceParams({
  pathPrefix: `${environment.apiUrl}/contenidos`
})
export class ContenidosResource extends Resource {

  constructor(handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({ method: ResourceRequestMethod.Get, path: '', responseBodyType: ResourceResponseBodyType.Json })
  declare getContenidos: IResourceMethodObservable<{nroRestaurante?: number} | void, IContenido[]>;

  @ResourceAction({ method: ResourceRequestMethod.Post, path: '/clicks', requestBodyType: ResourceRequestBodyType.JSON, responseBodyType: ResourceResponseBodyType.Json })
  declare registrarClick: IResourceMethodObservable<{nroRestaurante: number, nroIdioma: number, nroContenido: number}, {nroClick: number}>;
}
