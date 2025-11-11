import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import {AppErrorHandler} from './core/handlers/app-error-handler';
import {appHttpInterceptor} from './core/interceptors/app-http-interceptor';
import { ResourceHandler } from '@ngx-resource/core';
import { ResourceHandlerHttpClient } from '@ngx-resource/handler-ngx-http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([appHttpInterceptor])),
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: ResourceHandler, useClass: ResourceHandlerHttpClient },
  ]
};
