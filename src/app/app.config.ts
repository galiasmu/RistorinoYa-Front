import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, ErrorHandler } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ResourceHandler } from '@ngx-resource/core';
import { ResourceHandlerHttpClient } from '@ngx-resource/handler-ngx-http';
import { routes } from './app.routes';
import { AppErrorHandler } from './core/handlers/app-error-handler';
import { appHttpInterceptor } from './core/interceptors/app-http-interceptor';

// Igual que el ejemplo de la cátedra (clase 18 y 12-internacionalizacion): ngx-resource sobre HttpClient,
// interceptor funcional para el loader y ErrorHandler global
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideHttpClient(withInterceptors([appHttpInterceptor])),
    { provide: ResourceHandler, useClass: ResourceHandlerHttpClient },
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ]
};
