import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormativaEliminarComponent } from './normativa-eliminar.component';

describe('NormativaEliminarComponent', () => {
  let component: NormativaEliminarComponent;
  let fixture: ComponentFixture<NormativaEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NormativaEliminarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NormativaEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
