import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PromotionModel } from '../../api/models/promotion.model';

@Component({
  selector: 'rs-promotion-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './promotion-detail.component.html',
  styleUrls: ['./promotion-detail.component.css']
})

export class PromotionDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  loading = signal(false);
  promotion = signal<PromotionModel | null>(null);

  ngOnInit(): void {
    // Get promotion from resolver data
    const promotionData = this.route.snapshot.data['promotion'];

    if (promotionData) {
      this.promotion.set(promotionData);
    } else {
      this.router.navigateByUrl('/');
    }
  }

  goBack() {
    this.router.navigateByUrl('/');
  }
}
