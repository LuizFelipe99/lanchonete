import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankSnacksComponent } from './rank-snacks.component';

describe('RankSnacksComponent', () => {
  let component: RankSnacksComponent;
  let fixture: ComponentFixture<RankSnacksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RankSnacksComponent]
    });
    fixture = TestBed.createComponent(RankSnacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
