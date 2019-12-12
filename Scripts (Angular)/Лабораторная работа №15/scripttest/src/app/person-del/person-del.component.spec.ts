import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDelComponent } from './person-del.component';

describe('PersonDelComponent', () => {
  let component: PersonDelComponent;
  let fixture: ComponentFixture<PersonDelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonDelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
