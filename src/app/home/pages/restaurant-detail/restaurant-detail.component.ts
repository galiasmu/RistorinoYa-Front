import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from '../../models/restaurant.model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'rs-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class RestaurantDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);

  restaurant = signal<Restaurant | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {

    }
  }
}
