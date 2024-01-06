import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormDetailsComponent } from './dialog-form-details.component';

describe('DialogFormDetailsComponent', () => {
  let component: DialogFormDetailsComponent;
  let fixture: ComponentFixture<DialogFormDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogFormDetailsComponent]
    });
    fixture = TestBed.createComponent(DialogFormDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
