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
import { Concepto, ItemMenu, PlateClassDTO } from '@core/api/models';
import { FiltrosTablaService } from '@core/services/filtros-tabla.service';
import { TarifaRegistralService } from '@core/api/services/tarifa-registral.service';
import { VentanaModalComponent } from '@feature/parametros/valores-cobros/components/ventana-modal/ventana-modal.component';
import { TarifaRegistral } from '@core/api/models/tarifa-registral';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { SpinnerService } from '@core/services/spinner.service';
import { SOLO_NUMEROS_MONTO } from '@core/utils/Patterns';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-tarifa-registral-editar',
  templateUrl: './tarifa-registral-editar.component.html',
  styleUrls: ['./tarifa-registral-editar.component.scss']
})
export class TarifaRegistralEditarComponent {

  @Input() dataFromModalWindow: any;

  private subs = new SubSink();
  public mostrarSpinner = false;
  readonly dateFormat = 'YYYY-MM-DD';
  readonly SOLO_NUMEROS = '^[0-9]+$';
  
  // selects para poblar el formulario ( observables todos )
  public tipoVehiculo$: Observable<ItemMenu[]>;
  public tipoPlaca$: Observable<PlateClassDTO[]>;
  public conceptoDebito$: Observable<ItemMenu[]>;

  // data form
  public data: TarifaRegistral;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private messageSvc: MessageService,
    private filtroSvc: FiltrosTablaService,
    private tarifasSvc: TarifaRegistralService,
    public dialogRef: MatDialogRef<VentanaModalComponent>,
    private spinner: SpinnerService
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
    nombre:                 ['', [Validators.required, Validators.pattern(new RegExp("\\S")), Validators.maxLength(100)]],
    descripcion:            ['', [Validators.pattern(new RegExp("\\S")), Validators.maxLength(200)]],
    decimal:                  ['', [Validators.required, Validators.pattern(SOLO_NUMEROS_MONTO)]],
    observacion:            ['', [Validators.required, Validators.pattern(new RegExp("\\S")), Validators.maxLength(200)]],
  }); 

  get formControl() { return this.form.controls; }

  ngOnInit(): void {
    this.consultarDetalle();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const mensaje = {
        titulo: 'Editar tarifa por concepto de débito registral',
        cuerpo: '¿Está seguro que quiere modificar esta tarifa?'
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

  consultarDetalle(): void {
    const id = this.dataFromModalWindow.id;
    this.subs.add(
      this.tarifasSvc.findByIdTarifaRegistralUsingGET(id)
        .subscribe({
          next: data => {
            console.log('data detalle', data);
            this.data = data;
            this.form.patchValue({...data}, { emitEvent: false } );
            this.form.controls.fechaInicioVigencia.setValue(
              moment(data.fechaInicioVigencia, 'YYYY-MM-DD')
            );
            this.form.controls.fechaFinVigencia.setValue(
              moment(data.fechaFinVigencia, 'YYYY-MM-DD')
            );
            this.form.controls.conceptoDebRegistral.patchValue(data?.conceptoDebRegistral?.toString(), {emitEvent: true});
            this.form.controls.tipoVehiculo.setValue(data?.tipoVehiculo?.toString());
            this.form.controls.estado.setValue(data?.estado === 'A');
            this.form.controls.decimal.setValue(data?.decimal);
          },
          error: err => {
            this.mostrarSpinner = false;
            this.messageSvc.errorToast(err);
          },
          complete: () => this.mostrarSpinner = false
        })
    );
  }
  

  private prepararDatosAntesDeEnviar(datosDelFormulario: any): any {
    const formData: TarifaRegistral = datosDelFormulario;
    formData.idTarifaDebito = this.data.idTarifaDebito;
    formData.observacion = datosDelFormulario.observacion;
    formData.estado = this.formControl.estado.value == true ? 'A' : 'I';
    formData.fechaFinVigencia = this.formControl.fechaFinVigencia.value.format(this.dateFormat);
    formData.fechaInicioVigencia = this.formControl.fechaInicioVigencia.value.format(this.dateFormat);
    return formData;
  }

  private enviarFormulario(formulario: any): void {
    this.spinner.show();
    this.subs.add(
      this.tarifasSvc.updateTarifaRegistralUsingPUT(formulario)
        .subscribe({
          next: data => {
            this.spinner.hide();
            this.dialogRef.close(true);
            this.messageSvc.exito('Registo actualizado exitosamente');
          },
          error: err => {
            this.spinner.hide();
            this.messageSvc.errorToast(err);
          }
        })
    );
  }

  cancel(): void {
    if (this.form.dirty) {
      const mensaje = {
        titulo: 'Editar tarifa por concepto de débito registral',
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

  onDelete(): void {
    const mensaje = {
        titulo: 'Editar tarifa por concepto de débito registral',
        cuerpo: '¿Está seguro que quiere eliminar esta tarifa?'
      }
      this.messageSvc.confirmar(mensaje)
      .then(dialog => {
        if (dialog.isConfirmed) {
          this.eliminarTarifa();
        }
      });
  }

  eliminarTarifa(): void {
    this.spinner.show();
    this.subs.add(
      this.tarifasSvc.deleteTarifaRegistralUsingDELETE(this.data.idTarifaDebito)
        .subscribe({
          next: data => {
            this.spinner.hide();
            this.dialogRef.close(true);
            this.messageSvc.exito('Registo eliminado exitosamente');
          },
          error: err => {
            this.spinner.hide();
            this.messageSvc.errorToast(err);
          }
        })
    );
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