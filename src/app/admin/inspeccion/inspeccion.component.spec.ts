import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspeccionComponent } from './inspeccion.component';

describe('InspeccionComponent', () => {
  let component: InspeccionComponent;
  let fixture: ComponentFixture<InspeccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspeccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
