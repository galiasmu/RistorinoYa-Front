import { Routes } from '@angular/router';
import { PromotionDetailComponent } from './home/pages/promotion-detail/promotion-detail.component';
import { ContenidosResource } from './home/api/resources/contenidos-resource';
import { AuthResource } from './home/api/resources/auth-resource';
import { CatalogoResource } from './home/api/resources/catalogo-resource';
import { RestaurantesResource } from './home/api/resources/restaurantes-resource';
import { ReservasResource } from './home/api/resources/reservas-resource';
import { promotionResolver } from './home/resolvers/promotion.resolver';
import { preferenciasResolver } from './home/resolvers/preferencias-resolver';
import { localidadesResolver } from './home/resolvers/localidades-resolver';
import { restaurantesResolver } from './home/resolvers/restaurantes-resolver';
import { restauranteResolver } from './home/resolvers/restaurante-resolver';
import { sucursalesResolver } from './home/resolvers/sucursales-resolver';
import { contenidosRestauranteResolver } from './home/resolvers/contenidos-restaurante-resolver';
import { estadosReservasResolver } from './home/resolvers/estados-reservas-resolver';
import { authGuard } from './home/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/components/home/home.component').then(m => m.HomeComponent),
    providers: [ContenidosResource]
  },
  {
    path: 'promotion/:nroRestaurante/:nroIdioma/:nroContenido',
    component: PromotionDetailComponent,
    resolve: { promotion: promotionResolver },
    providers: [ContenidosResource]
  },
  {
    path: 'login',
    loadComponent: () => import('./home/pages/login-page/login-page').then(m => m.LoginPage),
    providers: [AuthResource]
  },
  {
    path: 'registro',
    loadComponent: () => import('./home/pages/registro-page/registro-page').then(m => m.RegistroPage),
    resolve: { preferencias: preferenciasResolver, localidades: localidadesResolver },
    providers: [AuthResource, CatalogoResource]
  },
  {
    path: 'restaurantes',
    loadComponent: () => import('./home/pages/restaurantes-page/restaurantes-page').then(m => m.RestaurantesPage),
    resolve: { restaurantes: restaurantesResolver },
    providers: [RestaurantesResource]
  },
  {
    path: 'restaurantes/:nroRestaurante',
    loadComponent: () => import('./home/pages/restaurante-page/restaurante-page').then(m => m.RestaurantePage),
    resolve: { restaurante: restauranteResolver, sucursales: sucursalesResolver, contenidos: contenidosRestauranteResolver },
    providers: [RestaurantesResource, ContenidosResource]
  },
  {
    path: 'reservar/:nroRestaurante/:nroSucursal',
    loadComponent: () => import('./home/pages/reserva-page/reserva-page').then(m => m.ReservaPage),
    resolve: { sucursales: sucursalesResolver },
    providers: [RestaurantesResource, ReservasResource]
  },
  {
    path: 'mis-reservas',
    loadComponent: () => import('./home/pages/mis-reservas-page/mis-reservas-page').then(m => m.MisReservasPage),
    canActivate: [authGuard],
    resolve: { estados: estadosReservasResolver },
    providers: [ReservasResource, CatalogoResource]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
