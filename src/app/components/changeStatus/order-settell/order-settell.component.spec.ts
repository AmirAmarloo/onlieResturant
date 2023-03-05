import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSettellComponent } from './order-settell.component';

describe('OrderSettellComponent', () => {
  let component: OrderSettellComponent;
  let fixture: ComponentFixture<OrderSettellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderSettellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderSettellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
