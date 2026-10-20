import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IContenido } from '../../api/models/i-contenido';


@Component({
  selector: 'rs-promotion-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './promotion-detail.component.html',
  styleUrls: ['./promotion-detail.component.css']
})

export class PromotionDetailComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _router: Router) {
  }

  loading = signal(false);
  promotion = signal<IContenido | null>(null);

  ngOnInit(): void {
    // El contenido lo trae promotionResolver antes de activar la ruta
    const promotionData = this._route.snapshot.data['promotion'];

    if (promotionData) {
      this.promotion.set(promotionData);
    } else {
      this._router.navigateByUrl('/');
    }
  }

  goBack() {
    this._router.navigateByUrl('/');
  }
}
