import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Carwash1Component } from './carwash1.component';

describe('Carwash1Component', () => {
  let component: Carwash1Component;
  let fixture: ComponentFixture<Carwash1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Carwash1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Carwash1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
