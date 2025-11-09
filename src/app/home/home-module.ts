import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { HomeRoutingModule } from './home-routing-module';
import { HomeComponent } from './components/home/home.component';
import { PromotionCardComponent } from './components/promotion-card/promotion-card.component';
import { RestaurantDetailComponent } from './pages/restaurant-detail/restaurant-detail.component';
import { PromotionDetailComponent } from './pages/promotion-detail/promotion-detail.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    HomeRoutingModule,
    // ✅ lo agregamos acá
    HomeComponent,
    PromotionCardComponent,
    RestaurantDetailComponent,
    PromotionDetailComponent
  ]
})
export class HomeModule {}
