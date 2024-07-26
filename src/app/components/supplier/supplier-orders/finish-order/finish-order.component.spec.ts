import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishOrderComponent } from './finish-order.component';

describe('FinishOrderComponent', () => {
  let component: FinishOrderComponent;
  let fixture: ComponentFixture<FinishOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinishOrderComponent]
    });
    fixture = TestBed.createComponent(FinishOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
