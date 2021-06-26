import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormativaCrearComponent } from './normativa-crear.component';

describe('NormativaCrearComponent', () => {
  let component: NormativaCrearComponent;
  let fixture: ComponentFixture<NormativaCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NormativaCrearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NormativaCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
