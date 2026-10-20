import { Component, Input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import type { IResourceResponse } from '@ngx-resource/core';
import { AuthResource } from '../../api/resources/auth-resource';
import { AuthService } from '../../../core/services/auth-service';
import { ISesion } from '../../../core/models/i-sesion';
import { IValorPreferencia } from '../../api/models/i-valor-preferencia';
import { ILocalidad } from '../../api/models/i-localidad';
import { IPreferenciaCliente } from '../../api/models/i-registro';

@Component({
  selector: 'app-registro-page',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './registro-page.html'
})
export class RegistroPage {
  @Input() preferencias: IValorPreferencia[] = [];
  @Input() localidades: ILocalidad[] = [];
  @Input() returnUrl?: string;

  registroForm = new FormGroup({
    apellido: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    nombre: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    correo: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    telefonos: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    nroLocalidad: new FormControl<number | null>(null, { validators: [Validators.required] }),
    clave: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(4)] }),
    confirmacionClave: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  });

  seleccionadas: IPreferenciaCliente[] = [];
  error = signal<string | null>(null);

  constructor(private _resource: AuthResource, private _auth: AuthService, private _router: Router) { }

  get categorias(): string[] {
    return [...new Set(this.preferencias.map(p => p.categoria))];
  }

  valoresDe(categoria: string): IValorPreferencia[] {
    return this.preferencias.filter(p => p.categoria === categoria);
  }

  cambiarPreferencia(valor: IValorPreferencia, event: Event): void {
    if ((event.target as HTMLInputElement).checked) {
      this.seleccionadas.push({ codCategoria: valor.codCategoria, nroValorDominio: valor.nroValorDominio });
    }
    else {
      this.seleccionadas = this.seleccionadas.filter(p => p.nroValorDominio !== valor.nroValorDominio || p.codCategoria !== valor.codCategoria);
    }
  }

  registrar(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }
    const datos = this.registroForm.getRawValue();
    if (datos.clave !== datos.confirmacionClave) {
      this.error.set($localize`Las claves no coinciden`);
      return;
    }
    this._resource.registrar({ ...datos, nroLocalidad: datos.nroLocalidad!, preferencias: this.seleccionadas }).subscribe({
      next: () => this.ingresar(datos.correo, datos.clave),
      error: (error: IResourceResponse) => this.error.set(error.body?.motivo === 'CORREO_EXISTENTE'
        ? $localize`Ya existe una cuenta con ese correo`
        : $localize`No se pudo completar el registro`)
    });
  }

  private ingresar(correo: string, clave: string): void {
    this._resource.login({ correo, clave }).subscribe((sesion: ISesion) => {
      this._auth.iniciarSesion(sesion);
      this._router.navigateByUrl(this.returnUrl || '/');
    });
  }
}
