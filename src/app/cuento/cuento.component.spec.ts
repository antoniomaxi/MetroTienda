import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentoComponent } from './cuento.component';

describe('CuentoComponent', () => {
  let component: CuentoComponent;
  let fixture: ComponentFixture<CuentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
