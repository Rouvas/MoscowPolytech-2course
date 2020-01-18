import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonemodelComponent } from './phonemodel.component';

describe('PhonemodelComponent', () => {
  let component: PhonemodelComponent;
  let fixture: ComponentFixture<PhonemodelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhonemodelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonemodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
