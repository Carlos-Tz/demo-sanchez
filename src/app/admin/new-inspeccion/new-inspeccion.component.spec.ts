import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInspeccionComponent } from './new-inspeccion.component';

describe('NewInspeccionComponent', () => {
  let component: NewInspeccionComponent;
  let fixture: ComponentFixture<NewInspeccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewInspeccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInspeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
