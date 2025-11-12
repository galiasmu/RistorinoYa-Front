import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ResourceModule, ResourceHandlerHttpClient } from '@ngx-resource/handler-ngx-http';
import { ResourceHandler } from '@ngx-resource/core';
import { routes } from './app.routes';
import { AppErrorHandler } from './core/handlers/app-error-handler';
import { appHttpInterceptor } from './core/interceptors/app-http-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([appHttpInterceptor])),
    importProvidersFrom(ResourceModule.forRoot()),
    { provide: ResourceHandler, useClass: ResourceHandlerHttpClient }, // 👈 este binding
    { provide: ErrorHandler, useClass: AppErrorHandler },
  ]
};
