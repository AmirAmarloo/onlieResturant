import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitparamComponent } from './initparam.component';

describe('InitparamComponent', () => {
  let component: InitparamComponent;
  let fixture: ComponentFixture<InitparamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitparamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitparamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
