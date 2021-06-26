import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormativaDetalleComponent } from './normativa-detalle.component';

describe('NormativaDetalleComponent', () => {
  let component: NormativaDetalleComponent;
  let fixture: ComponentFixture<NormativaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NormativaDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NormativaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
