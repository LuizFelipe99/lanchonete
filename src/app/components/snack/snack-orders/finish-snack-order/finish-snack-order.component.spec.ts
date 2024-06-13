import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishSnackOrderComponent } from './finish-snack-order.component';

describe('FinishSnackOrderComponent', () => {
  let component: FinishSnackOrderComponent;
  let fixture: ComponentFixture<FinishSnackOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinishSnackOrderComponent]
    });
    fixture = TestBed.createComponent(FinishSnackOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
