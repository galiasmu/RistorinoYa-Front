import { Injectable } from '@angular/core';
import { Resource, ResourceAction, ResourceHandler, ResourceParams, ResourceRequestMethod, ResourceResponseBodyType } from '@ngx-resource/core';
import type { IResourceMethodObservable } from '@ngx-resource/core';
import { IValorPreferencia } from '../models/i-valor-preferencia';
import { ILocalidad } from '../models/i-localidad';
import { IEstadoReserva } from '../models/i-estado-reserva';
import { environment } from '../../../../environments/environment';

@Injectable()
@ResourceParams({
  pathPrefix: `${environment.apiUrl}/catalogo`
})
export class CatalogoResource extends Resource {

  constructor(handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({ method: ResourceRequestMethod.Get, path: '/preferencias', responseBodyType: ResourceResponseBodyType.Json })
  declare getPreferencias: IResourceMethodObservable<void, IValorPreferencia[]>;

  @ResourceAction({ method: ResourceRequestMethod.Get, path: '/localidades', responseBodyType: ResourceResponseBodyType.Json })
  declare getLocalidades: IResourceMethodObservable<void, ILocalidad[]>;

  @ResourceAction({ method: ResourceRequestMethod.Get, path: '/estados-reservas', responseBodyType: ResourceResponseBodyType.Json })
  declare getEstadosReservas: IResourceMethodObservable<void, IEstadoReserva[]>;
}
