import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTakeawaystuffDialogComponent } from './delete-takeawaystuff-dialog.component';

describe('DeleteTakeawaystuffDialogComponent', () => {
  let component: DeleteTakeawaystuffDialogComponent;
  let fixture: ComponentFixture<DeleteTakeawaystuffDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTakeawaystuffDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTakeawaystuffDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
