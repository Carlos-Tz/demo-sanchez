import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Carwash3Component } from './carwash3.component';

describe('Carwash3Component', () => {
  let component: Carwash3Component;
  let fixture: ComponentFixture<Carwash3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Carwash3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Carwash3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
