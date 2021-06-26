/* -----------------------------------------
AUTOR: Victor Pinedo
EMPRESA: Asesoftware
REQUERIMIENTO: Sprint_02 - HU_2.2.1
FECHA CREACIÓN: Marzo 23 de 2021
------------------------------------------- */
import { Component, Input } from '@angular/core';

import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from '@core/services/message.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Concepto, ItemMenu, PlateClassDTO, TarifaRegistralCreate } from '@core/api/models';
import { FiltrosTablaService } from '@core/services/filtros-tabla.service';
import { TarifaRegistralService } from '@core/api/services/tarifa-registral.service';
import { VentanaModalComponent } from '@feature/parametros/valores-cobros/components/ventana-modal/ventana-modal.component';
import { SOLO_NUMEROS_MONTO } from '@core/utils/Patterns';

@Component({
  selector: 'app-tarifa-registral-crear',
  templateUrl: './tarifa-registral-crear.component.html',
  styleUrls: ['./tarifa-registral-crear.component.scss']
})
export class TarifaRegistralCrearComponent {

  @Input() dataFromModalWindow: any;

  private subs = new SubSink();
  public mostrarSpinner = false;
  readonly dateFormat = 'YYYY-MM-DD';
  readonly SOLO_NUMEROS = '^[0-9]+$';
  
  // selects para poblar el formulario ( observables todos )
  public tipoVehiculo$: Observable<ItemMenu[]>;
  public tipoPlaca$: Observable<PlateClassDTO[]>;
  public conceptoDebito$: Observable<ItemMenu[]>;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private messageSvc: MessageService,
    private filtroSvc: FiltrosTablaService,
    private tarifasSvc: TarifaRegistralService,
    public dialogRef: MatDialogRef<VentanaModalComponent>
  ) { 
    this.mostrarSpinner = true;
    this.cargarListasDesplegables();
  } 

  private cargarListasDesplegables(): void {
    this.tipoPlaca$ = this.filtroSvc.tipoPlaca();
    this.tipoVehiculo$ = this.filtroSvc.tipoVehiculo();
    this.conceptoDebito$ = this.filtroSvc.conceptosDebitoRegistralActVigentes();
  }

  public form = this.fb.group({
    conceptoDebRegistral:   ['', [Validators.required]],
    tipoPlaca:              ['', [Validators.required]],
    tipoVehiculo:           ['', [Validators.required]],
    fechaInicioVigencia:    ['', [Validators.required]],
    fechaFinVigencia:       ['', [Validators.required]],
    estado:                 [true, [Validators.required]],
    nombre:                 ['', [Validators.required, Validators.maxLength(100), Validators.pattern(new RegExp("\\S")),]],
    descripcion:            ['', [Validators.maxLength(200), Validators.pattern(new RegExp("\\S")),]],
    decimal:                  ['', [Validators.required, Validators.pattern(SOLO_NUMEROS_MONTO)]]
  }); 

  get formControl() { return this.form.controls; }

  onSubmit(): void {
    if (this.form.valid) {
      const mensaje = {
        titulo: 'Crear tarifa por concepto de débito registral',
        cuerpo: '¿Está seguro que quiere crear esta tarifa?'
      }
      this.messageSvc.confirmar(mensaje)
      .then(dialog => {
        if (dialog.isConfirmed) {
          const formulario = this.prepararDatosAntesDeEnviar(this.form.value);
          this.enviarFormulario(formulario);
        }
      });
    }
    return;
  }

  private prepararDatosAntesDeEnviar(datosDelFormulario: any): any {
    const formData: TarifaRegistralCreate = datosDelFormulario;
    formData.estado = this.formControl.estado.value == true ? 'A' : 'I';
    formData.fechaFinVigencia = this.formControl.fechaFinVigencia.value.format(this.dateFormat);
    formData.fechaInicioVigencia = this.formControl.fechaInicioVigencia.value.format(this.dateFormat);
    return formData;
  }

  private enviarFormulario(formulario: any) {
    this.subs.add(
      this.tarifasSvc.createTarifaRegistralUsingPOST(formulario)
        .subscribe({
          next: data => {
            this.dialogRef.close(true);
            this.messageSvc.exito('Registo creado exitosamente');
          },
          error: err => {
            this.messageSvc.errorToast(err);
          }
        })
    );
  }

  cancel(): void {
    if (this.form.dirty) {
      const mensaje = {
        titulo: 'Crear tarifa por concepto de débito registral',
        cuerpo: 'Algunos campos se encuentran diligenciados, ¿está seguro de salir sin guardar la información?'
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

  onlyNumberMonto(e: any): boolean {
    if (e)
      return ((e.keyCode > 95 && e.keyCode < 106 && e.keyCode != 101)
        || (e.keyCode > 47 && e.keyCode < 58) 
        || e.keyCode == 8 || e.code == 'Comma' || e.keyCode == 188);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}