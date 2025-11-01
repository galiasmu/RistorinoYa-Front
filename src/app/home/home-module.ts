import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import {HomeRoutingModule} from './home-routing-module';
import { HomeComponent } from './components/home/home.component';
import { PromotionCardComponent } from './components/promotion-card/promotion-card.component';
import { RestaurantDetailComponent } from './pages/restaurant-detail/restaurant-detail.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    HomeRoutingModule,
    RestaurantDetailComponent,
    PromotionCardComponent
  ]
})
export class HomeModule {}
