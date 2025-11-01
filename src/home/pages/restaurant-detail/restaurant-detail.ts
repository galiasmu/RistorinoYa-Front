import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import {PromotionsService} from '../../services/promotions/promotion.service';
import { Restaurant } from '../../models/restaurant.model';

@Component({
  selector: 'rs-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantDetailComponent {
  private route = inject(ActivatedRoute);
  private promotionsSvc = inject(PromotionsService);

  loading = true;
  errorMsg = '';

  restaurant$ = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    switchMap(id => this.promotionsSvc.getRestaurantById(id)),
    tap(() => (this.loading = false)),
    catchError(err => {
      this.errorMsg = 'No pudimos cargar el restaurante.';
      this.loading = false;
      console.error('getRestaurantById error', err);
      return of(null as unknown as Restaurant);
    })
  );
}
