import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CakeListComponent } from './cake-list.component';

describe('CakeListComponent', () => {
  let component: CakeListComponent;
  let fixture: ComponentFixture<CakeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CakeListComponent]
    });
    fixture = TestBed.createComponent(CakeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
