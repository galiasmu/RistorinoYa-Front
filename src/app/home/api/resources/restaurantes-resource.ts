import { Injectable } from '@angular/core';
import { Resource, ResourceAction, ResourceHandler, ResourceParams, ResourceRequestMethod, ResourceResponseBodyType } from '@ngx-resource/core';
import type { IResourceMethodObservable } from '@ngx-resource/core';
import { IRestaurante } from '../models/i-restaurante';
import { ISucursal } from '../models/i-sucursal';
import { IDisponibilidad } from '../models/i-disponibilidad';
import { environment } from '../../../../environments/environment';

@Injectable()
@ResourceParams({
  pathPrefix: `${environment.apiUrl}/restaurantes`
})
export class RestaurantesResource extends Resource {

  constructor(handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({ method: ResourceRequestMethod.Get, path: '', responseBodyType: ResourceResponseBodyType.Json })
  declare getRestaurantes: IResourceMethodObservable<void, IRestaurante[]>;

  @ResourceAction({ method: ResourceRequestMethod.Get, path: '/{!nroRestaurante}', responseBodyType: ResourceResponseBodyType.Json })
  declare getRestaurante: IResourceMethodObservable<{nroRestaurante: number}, IRestaurante>;

  @ResourceAction({ method: ResourceRequestMethod.Get, path: '/{!nroRestaurante}/sucursales', responseBodyType: ResourceResponseBodyType.Json })
  declare getSucursales: IResourceMethodObservable<{nroRestaurante: number}, ISucursal[]>;

  @ResourceAction({ method: ResourceRequestMethod.Get, path: '/{!nroRestaurante}/sucursales/{!nroSucursal}/disponibilidad', responseBodyType: ResourceResponseBodyType.Json })
  declare getDisponibilidad: IResourceMethodObservable<{nroRestaurante: number, nroSucursal: number, fecha: string, adultos: number, menores: number}, IDisponibilidad[]>;
}
