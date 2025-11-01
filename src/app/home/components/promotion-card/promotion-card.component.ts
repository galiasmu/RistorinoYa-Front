import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Promotion } from '../../models/promotion.model';

@Component({
  selector: 'rs-promotion-card',
  templateUrl: './promotion-card.component.html',
  styleUrls: ['./promotion-card.component.css']
})
export class PromotionCardComponent {
  @Input() promotion!: Promotion;
  @Output() open = new EventEmitter<void>();
}
