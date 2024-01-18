import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmItemComponent } from './confirm-item.component';

describe('ConfirmItemComponent', () => {
  let component: ConfirmItemComponent;
  let fixture: ComponentFixture<ConfirmItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmItemComponent]
    });
    fixture = TestBed.createComponent(ConfirmItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
