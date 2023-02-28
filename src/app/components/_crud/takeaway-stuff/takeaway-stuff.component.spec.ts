import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeawayStuffComponent } from './takeaway-stuff.component';

describe('TakeawayStuffComponent', () => {
  let component: TakeawayStuffComponent;
  let fixture: ComponentFixture<TakeawayStuffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakeawayStuffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TakeawayStuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
