import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { LOCALE_ID, inject } from '@angular/core';
import { LoaderService } from '../services/loader-service';
import { AuthService } from '../services/auth-service';
import { catchError, finalize, throwError } from 'rxjs';

// Agrega a cada pedido el idioma de la aplicación y, si hay sesión, el token JWT
export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const _loader = inject(LoaderService);
  const _auth = inject(AuthService);
  const _locale = inject(LOCALE_ID);

  const token = _auth.token;
  const idioma = { 'Accept-Language': _locale.substring(0, 2) };
  const headers: Record<string, string> = token ? { ...idioma, Authorization: `Bearer ${token}` } : idioma;

  _loader.start();

  return next(req.clone({ setHeaders: headers })).pipe(
    catchError((error: HttpErrorResponse) => {
      // Token vencido o revocado: se cierra la sesión y se reintenta el pedido sin token
      if (error.status === 401 && token) {
        _auth.cerrarSesion();
        return next(req.clone({ setHeaders: idioma }));
      }
      return throwError(() => error);
    }),
    finalize(() => _loader.complete())
  );
};
