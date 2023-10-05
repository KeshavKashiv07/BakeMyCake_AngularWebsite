import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CakeCardsComponent } from './cake-cards.component';

describe('CakeCardsComponent', () => {
  let component: CakeCardsComponent;
  let fixture: ComponentFixture<CakeCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CakeCardsComponent]
    });
    fixture = TestBed.createComponent(CakeCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
