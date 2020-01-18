import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneSortComponent } from './phone-sort.component';

describe('PhoneSortComponent', () => {
  let component: PhoneSortComponent;
  let fixture: ComponentFixture<PhoneSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
