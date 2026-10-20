import { Injectable, computed, signal } from '@angular/core';
import { ISesion } from '../models/i-sesion';

// La sesión se guarda en sessionStorage y se borra al cerrar sesión (Req 5)
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _sesion = signal<ISesion | null>(this.leerSesion());

  readonly sesion = this._sesion.asReadonly();
  readonly logueado = computed(() => this._sesion() !== null);

  get token(): string | null {
    return this._sesion()?.token ?? null;
  }

  iniciarSesion(sesion: ISesion): void {
    sessionStorage.setItem('sesion', JSON.stringify(sesion));
    this._sesion.set(sesion);
  }

  cerrarSesion(): void {
    sessionStorage.clear();
    this._sesion.set(null);
  }

  private leerSesion(): ISesion | null {
    const sesion = sessionStorage.getItem('sesion');
    return sesion ? JSON.parse(sesion) : null;
  }
}
