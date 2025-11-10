import { Routes } from '@angular/router';
import {PromotionDetailComponent} from './home/pages/promotion-detail/promotion-detail.component';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home-module').then(m => m.HomeModule) },
  {
    path: 'promotion/:nroRestaurante/:nroIdioma/:nroContenido',
    loadComponent: () => import('./home/pages/promotion-detail/promotion-detail.component')
      .then(m => m.PromotionDetailComponent)
  },
  { path: '**', redirectTo: '' }
];
