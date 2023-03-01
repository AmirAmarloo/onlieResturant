import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTakeawyComponent } from './order-takeawy.component';

describe('OrderTakeawyComponent', () => {
  let component: OrderTakeawyComponent;
  let fixture: ComponentFixture<OrderTakeawyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderTakeawyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderTakeawyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
