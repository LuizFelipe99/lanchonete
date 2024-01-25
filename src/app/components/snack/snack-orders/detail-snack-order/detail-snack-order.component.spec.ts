import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSnackOrderComponent } from './detail-snack-order.component';

describe('DetailSnackOrderComponent', () => {
  let component: DetailSnackOrderComponent;
  let fixture: ComponentFixture<DetailSnackOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailSnackOrderComponent]
    });
    fixture = TestBed.createComponent(DetailSnackOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
