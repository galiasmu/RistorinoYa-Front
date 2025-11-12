import { Routes } from '@angular/router';
import { promotionResolver } from './home/resolvers/promotion.resolver';
import { clickResolver } from './home/resolvers/click.resolver';
import { PromotionDetailComponent } from './home/pages/promotion-detail/promotion-detail.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/components/home/home.component')
      .then(m => m.HomeComponent)
  },
  {
    path: 'promotion/:nroRestaurante/:nroIdioma/:nroContenido',
    component: PromotionDetailComponent, // your detail component
    resolve: {
      promotion: promotionResolver,
      click: clickResolver
    }
  }
];
