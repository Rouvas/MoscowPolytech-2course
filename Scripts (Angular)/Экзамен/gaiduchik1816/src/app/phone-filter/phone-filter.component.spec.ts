import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneFilterComponent } from './phone-filter.component';

describe('PhoneFilterComponent', () => {
  let component: PhoneFilterComponent;
  let fixture: ComponentFixture<PhoneFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
