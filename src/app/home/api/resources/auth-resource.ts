import { Injectable } from '@angular/core';
import { Resource, ResourceAction, ResourceHandler, ResourceParams, ResourceRequestBodyType, ResourceRequestMethod, ResourceResponseBodyType } from '@ngx-resource/core';
import type { IResourceMethodObservable } from '@ngx-resource/core';
import { IRegistro, IRegistroResponse } from '../models/i-registro';
import { ISesion } from '../../../core/models/i-sesion';
import { environment } from '../../../../environments/environment';

@Injectable()
@ResourceParams({
  pathPrefix: `${environment.apiUrl}/auth`
})
export class AuthResource extends Resource {

  constructor(handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({ method: ResourceRequestMethod.Post, path: '/registro', requestBodyType: ResourceRequestBodyType.JSON, responseBodyType: ResourceResponseBodyType.Json })
  declare registrar: IResourceMethodObservable<IRegistro, IRegistroResponse>;

  @ResourceAction({ method: ResourceRequestMethod.Post, path: '/login', requestBodyType: ResourceRequestBodyType.JSON, responseBodyType: ResourceResponseBodyType.Json })
  declare login: IResourceMethodObservable<{correo: string, clave: string}, ISesion>;

  @ResourceAction({ method: ResourceRequestMethod.Post, path: '/logout' })
  declare logout: IResourceMethodObservable<void, void>;
}
