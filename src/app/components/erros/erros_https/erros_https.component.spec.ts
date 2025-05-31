import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorHttpsComponent } from './erros_https.component';

describe('Error404Component', () => {
  let component: ErrorHttpsComponent;
  let fixture: ComponentFixture<ErrorHttpsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorHttpsComponent]
    });
    fixture = TestBed.createComponent(ErrorHttpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
