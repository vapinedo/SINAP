import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormativaModificarComponent } from './normativa-modificar.component';

describe('NormativaModificarComponent', () => {
  let component: NormativaModificarComponent;
  let fixture: ComponentFixture<NormativaModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NormativaModificarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NormativaModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
