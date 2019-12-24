import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonFilterComponent } from './person-filter.component';

describe('PersonFilterComponent', () => {
  let component: PersonFilterComponent;
  let fixture: ComponentFixture<PersonFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
