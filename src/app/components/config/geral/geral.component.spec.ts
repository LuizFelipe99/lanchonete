import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeralComponent } from './geral.component';

describe('GeralComponent', () => {
  let component: GeralComponent;
  let fixture: ComponentFixture<GeralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeralComponent]
    });
    fixture = TestBed.createComponent(GeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
