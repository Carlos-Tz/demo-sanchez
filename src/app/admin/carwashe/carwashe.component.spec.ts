import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarwasheComponent } from './carwashe.component';

describe('CarwasheComponent', () => {
  let component: CarwasheComponent;
  let fixture: ComponentFixture<CarwasheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarwasheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarwasheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
