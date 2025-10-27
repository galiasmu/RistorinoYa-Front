import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionCard } from './promotion-card';

describe('PromotionCard', () => {
  let component: PromotionCard;
  let fixture: ComponentFixture<PromotionCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
