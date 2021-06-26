/* -----------------------------------------
AUTOR: Victor Pinedo
EMPRESA: Asesoftware
REQUERIMIENTO: Sprint_02 - HU_1.6.x
FECHA CREACIÓN: Marzo 24 de 2021
------------------------------------------- */
import { SubSink } from 'subsink';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Department, Municipality } from '@core/api/models';
import { map, startWith } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FiltrosTablaService } from '@core/services/filtros-tabla.service';
import { Component, OnDestroy, ElementRef, ViewChild, Input } from '@angular/core';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { VentanaModalComponent } from '@feature/parametros/valores-cobros/components/ventana-modal/ventana-modal.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageService } from '@core/services/message.service';

@Component({
  selector: 'app-asociar-municipios',
  templateUrl: 'asociar-municipios.component.html',
  styleUrls: ['asociar-municipios.component.scss']
})
export class AsociarMunicipiosComponent implements OnDestroy {

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
  @Input() dataFromModalWindow: any;

  constructor(
    private filtrosTablaSvc: FiltrosTablaService,
    public dialogRef: MatDialogRef<VentanaModalComponent>,
    private messageSvc: MessageService,
  ) {
    this._cargarDepartamentos();
    this._setDepartamentosSelect();
    this._setMunicipiosSelect();
  }


  private cargarDepartamentosEntrada(): void {
    let departamentos: any[] = this.dataFromModalWindow?.municipios?.map(mun => mun.idDepartamento);
    if (departamentos?.length > 0) {
      this._cargarMunicipiosPorDepartamentoID(departamentos, true);
      let departments: Department[] = this.todosLosDepartamentos.filter(x => departamentos.includes(x.departamento));
      for (let dept of departments) {
        if (!this.departamentos.includes(dept)) {
          this.departamentos.push(dept);
        }
      }
    }
  }

  private cargarMunicipiosEntrada(): void {
    let municipalities: Municipality[] = this.todosLosMunicipios?.filter(x => {
      return this.dataFromModalWindow?.municipios?.some(y => {
        return x?.departamento === y?.idDepartamento && x?.municipio === y?.idMunicipio
      })
    });
    for (let mun of municipalities) {
      if (!this.municipios.includes(mun)) {
        this.municipios.push(mun);
      }
    }
  }

  private _cargarDepartamentos(): void {
    this.filtrosTablaSvc.departamentos()  
      .subscribe(data => {
        this.todosLosDepartamentos = data;
        this.cargarDepartamentosEntrada();
      });
  }

  private _cargarMunicipiosPorDepartamentoID(departamentosId: number[], bandera?: boolean): void {
    if(departamentosId.length > 0) {
      this.filtrosTablaSvc.municipiosPorDepartamentos(departamentosId)  
        .subscribe(data => {
          this.todosLosMunicipios = data;
          this.mpioCtrl.setValue('');
          if (bandera) {
            this.cargarMunicipiosEntrada();
          }
        });
    }
    else {
      this.todosLosMunicipios = [];
    }
  }

  private _setDepartamentosSelect(): void {
    this.departamentosFiltrados$ = this.deptoCtrl.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value?.descripcion),
      map(descripcion => descripcion ? this._filter(descripcion) : this.todosLosDepartamentos.slice() )
      );
  }

  private _setMunicipiosSelect(): void {
    this.municipiosFiltrados$ = this.mpioCtrl.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value?.descripcion),
      map(descripcion => descripcion ? this._filterMunicipio(descripcion) : this.todosLosMunicipios.slice() )
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
  }

  selected(event: MatAutocompleteSelectedEvent | any): void {
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
  }

  private _obtenerDepartamentosId(departamentos: Department[]) {
    return departamentos.map(depto => depto.departamento);
  }

  private _filter(descripcion: string): Department[] {
    const deptoAFiltrar = descripcion?.toLowerCase();
    return this.todosLosDepartamentos.filter(departamento => {
      return departamento?.descripcion?.toLowerCase().indexOf(deptoAFiltrar) === 0;
    });
  }

  private _filterMunicipio(descripcion: string): Municipality[] {
    const mpioAFiltar = descripcion?.toLowerCase();
    return this.todosLosMunicipios.filter(municipio => {
      return municipio.descripcion.toLowerCase().indexOf(mpioAFiltar) === 0;
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

  cancel(): void {
    if (this.deptoCtrl.dirty || this.mpioCtrl.dirty) {
      const mensaje = {
        titulo: 'Asociar municipios',
        cuerpo: '¿Desea salir sin guardar la información?'
      }
      this.messageSvc.confirmar(mensaje)
      .then(dialog => {
        if (dialog.isConfirmed) {
          this.dialogRef.close();
        }
      });
    } else {
      this.dialogRef.close();
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
