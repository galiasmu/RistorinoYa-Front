import { Injectable } from '@angular/core';
import { Resource, ResourceAction, ResourceHandler, ResourceParams, ResourceRequestBodyType, ResourceRequestMethod, ResourceResponseBodyType } from '@ngx-resource/core';
import type { IResourceMethodObservable } from '@ngx-resource/core';
import { IReservaCliente, IReservaRequest, IReservaResponse } from '../models/i-reserva';
import { environment } from '../../../../environments/environment';

@Injectable()
@ResourceParams({
  pathPrefix: `${environment.apiUrl}/reservas`
})
export class ReservasResource extends Resource {

  constructor(handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({ method: ResourceRequestMethod.Post, path: '', requestBodyType: ResourceRequestBodyType.JSON, responseBodyType: ResourceResponseBodyType.Json })
  declare confirmarReserva: IResourceMethodObservable<IReservaRequest, IReservaResponse>;

  @ResourceAction({ method: ResourceRequestMethod.Get, path: '', responseBodyType: ResourceResponseBodyType.Json })
  declare getReservas: IResourceMethodObservable<{codEstado?: number, fechaDesde?: string, fechaHasta?: string}, IReservaCliente[]>;
}
