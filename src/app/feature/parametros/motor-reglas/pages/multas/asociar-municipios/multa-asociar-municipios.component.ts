
import { SubSink } from 'subsink';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Department, Municipality } from '@core/api/models';
import { map, startWith } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FiltrosTablaService } from '@core/services/filtros-tabla.service';
import { Component, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { VentanaModalComponent } from '@feature/parametros/valores-cobros/components/ventana-modal/ventana-modal.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-multa-asociar-municipios',
  templateUrl: './multa-asociar-municipios.component.html',
  styleUrls: ['./multa-asociar-municipios.component.scss']
})
export class MultaAsociarMunicipiosComponent implements OnDestroy {
  private subs = new SubSink();

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  deptoCtrl = new FormControl();
  departamentos: Department[] = [];
  todosLosDepartamentos: Department[] = [];
  departamentosFiltrados$: Observable<Department[]>;

  mpioCtrl = new FormControl();
  municipios: Municipality[] = [];
  todosLosMunicipios: Municipality[] = [];
  municipiosFiltrados$: Observable<Municipality[]>;

  @ViewChild('deptoInput') deptoInput: ElementRef<HTMLInputElement>;
  @ViewChild('matAutocompleteDepto') matAutocomplete: MatAutocomplete;

  @ViewChild('mpioInput') mpioInput: ElementRef<HTMLInputElement>;
  @ViewChild('matAutocompleteMpio') matAutocomplete2: MatAutocomplete;

  constructor(
    private filtrosTablaSvc: FiltrosTablaService,
    public dialogRef: MatDialogRef<VentanaModalComponent>
  ) {
    this._cargarDepartamentos();
    this._setDepartamentosSelect();
    this._setMunicipiosSelect();
  }

  private _cargarDepartamentos(): void {
    this.filtrosTablaSvc.departamentos()  
      .subscribe(data => this.todosLosDepartamentos = data);
  }

  private _cargarMunicipiosPorDepartamentoID(departamentosId: number[]): void {
    if(departamentosId.length > 0) {
      this.filtrosTablaSvc.municipiosPorDepartamentos(departamentosId)  
        .subscribe(data => {
          this.todosLosMunicipios = data;
        });
    }
    else {
      this.todosLosMunicipios = [];
    }
  }

  private _setDepartamentosSelect(): void {
    this.departamentosFiltrados$ = this.deptoCtrl.valueChanges
    .pipe(
      startWith('default'),
      map(depto => {
        if (typeof depto === 'string') {
          // console.log('String', depto);
          return this.todosLosDepartamentos;
        }
        else {
          if (depto !== null) {
            // console.log('depto', depto); 
            return this._filter(depto);
          } 
        }
      })
      );
  }

  private _setMunicipiosSelect(): void {
    this.municipiosFiltrados$ = this.mpioCtrl.valueChanges
    .pipe(
      startWith('default'),
      map(mpio => {
        if (typeof mpio === 'string') {
          // console.log('String', mpio);
          return this.todosLosMunicipios;
        }
        else {
          if (mpio !== null) {
            // console.log('mpio', mpio); 
            return this._filterMunicipio(mpio);
          } 
        }
      })
      );
  }

  remove(depto: Department): void {
    for(let i=0; i<this.departamentos.length; i++) {
      if(this.departamentos[i].departamento === depto.departamento) {
        this.departamentos.splice(i, 1);
      }
    }

    const departamentosId = this._obtenerDepartamentosId(this.departamentos);
    this._cargarMunicipiosPorDepartamentoID(departamentosId);
  }

  removeMunicipio(mpio: Municipality): void {
    for(let i=0; i<this.municipios.length; i++) {
      if(this.municipios[i].municipio === mpio.municipio) {
        this.municipios.splice(i, 1);
      }
    }

    console.log(this.municipios);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const depto = event.option.value;

    if (!this.departamentos.includes(depto)) {
      this.departamentos.push(depto);
      this.deptoInput.nativeElement.value = '';
      this.deptoCtrl.setValue(null);
    }

    const departamentosId = this._obtenerDepartamentosId(this.departamentos);
    this._cargarMunicipiosPorDepartamentoID(departamentosId);
  }

  selectedMunicipio(event: MatAutocompleteSelectedEvent): void {
    const mpio = event.option.value;

    if (!this.municipios.includes(mpio)) {
      this.municipios.push(mpio);
      this.mpioInput.nativeElement.value = '';
      this.mpioCtrl.setValue(null);
    }

    console.log(this.municipios);
  }

  private _obtenerDepartamentosId(departamentos: Department[]) {
    return departamentos.map(depto => depto.departamento);
  }

  private _filter(depto: Department): Department[] {
    const deptoAFiltrar = depto.descripcion.toLowerCase();
    return this.todosLosDepartamentos.filter(departamento => {
      return departamento.descripcion.toLowerCase().indexOf(deptoAFiltrar) === depto;
    });
  }

  private _filterMunicipio(mpio: Municipality): Municipality[] {
    const mpioAFiltar = mpio.descripcion.toLowerCase();
    return this.todosLosMunicipios.filter(municipio => {
      return municipio.descripcion.toLowerCase().indexOf(mpioAFiltar) === mpio;
    });
  }

  enviarMunicipios(): void {
    const municipios = this.municipios.map(municipio => {
      return { 
        idMunicipio: municipio.municipio,
        idDepartamento: municipio.departamento
      }
    })
    this.dialogRef.close(municipios);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
