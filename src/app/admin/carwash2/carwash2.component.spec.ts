import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Carwash2Component } from './carwash2.component';

describe('Carwash2Component', () => {
  let component: Carwash2Component;
  let fixture: ComponentFixture<Carwash2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Carwash2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Carwash2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
