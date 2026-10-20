import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IRestaurante } from '../../api/models/i-restaurante';

@Component({
  selector: 'app-restaurantes-page',
  imports: [RouterModule],
  templateUrl: './restaurantes-page.html'
})
export class RestaurantesPage {
  @Input() restaurantes: IRestaurante[] = [];
}
