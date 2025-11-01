import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantDetailComponent } from './restaurant-detail.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RestaurantDetailComponent', () => {
  let component: RestaurantDetailComponent;
  let fixture: ComponentFixture<RestaurantDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantDetailComponent], // usamos NgModule, no standalone
      imports: [
        CommonModule,               // para *ngIf / *ngFor en el template
        RouterTestingModule,        // por si usa ActivatedRoute/router
        HttpClientTestingModule     // por si el componente o services hacen HTTP
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
