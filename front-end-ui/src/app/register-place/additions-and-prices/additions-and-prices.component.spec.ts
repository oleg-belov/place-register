import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionsAndPricesComponent } from './additions-and-prices.component';

describe('AdditionsAndPricesComponent', () => {
  let component: AdditionsAndPricesComponent;
  let fixture: ComponentFixture<AdditionsAndPricesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionsAndPricesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionsAndPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
