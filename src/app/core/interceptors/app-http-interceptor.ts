import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import {LoaderService} from '../services/loader-service';
import {delay, finalize} from 'rxjs';

export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const _loader = inject(LoaderService);

  _loader.start();

  return next(req).pipe(
    delay(2000),
    finalize(() => _loader.complete())
  );
};
