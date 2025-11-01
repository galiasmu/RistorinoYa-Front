import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from './components/home/home';
import {RestaurantDetailComponent} from './pages/restaurant-detail/restaurant-detail';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'restaurantes/:id', component: RestaurantDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
