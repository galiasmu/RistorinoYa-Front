import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from './components/home/home.component';
import {RestaurantDetailComponent} from './pages/restaurant-detail/restaurant-detail.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'restaurantes/:id', component: RestaurantDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
