import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Promotion } from '../../models/promotion.model';
import {CommonModule} from '@angular/common';
@Component({
  selector: 'rs-promotion-card',
  templateUrl: './promotion-card.component.html',
  styleUrls: ['./promotion-card.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class PromotionCardComponent {
  @Input() promotion!: Promotion;
  @Output() open = new EventEmitter<void>();
  onClick(event: MouseEvent) {
    event.stopPropagation();
    this.open.emit();
  }
}
