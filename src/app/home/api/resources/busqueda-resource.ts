import { Injectable } from '@angular/core';
import { Resource, ResourceAction, ResourceHandler, ResourceParams, ResourceRequestBodyType, ResourceRequestMethod, ResourceResponseBodyType } from '@ngx-resource/core';
import type { IResourceMethodObservable } from '@ngx-resource/core';
import { IResultadoBusqueda } from '../models/i-resultado-busqueda';
import { environment } from '../../../../environments/environment';

@Injectable()
@ResourceParams({
  pathPrefix: `${environment.apiUrl}/busqueda`
})
export class BusquedaResource extends Resource {

  constructor(handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({ method: ResourceRequestMethod.Post, path: '/lenguaje-natural', requestBodyType: ResourceRequestBodyType.JSON, responseBodyType: ResourceResponseBodyType.Json })
  declare buscarLenguajeNatural: IResourceMethodObservable<{texto: string}, IResultadoBusqueda[]>;
}