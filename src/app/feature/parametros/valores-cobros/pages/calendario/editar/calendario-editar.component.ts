/* -----------------------------------------
AUTOR: Victor Pinedo
EMPRESA: Asesoftware
REQUERIMIENTO: Sprint_01 - HU_1.7.03
FECHA CREACIÓN: Marzo 2 de 2021
------------------------------------------- */
import { Component, Input, OnInit } from '@angular/core';

import { SubSink } from 'subsink';
import { Meses } from '@core/models/Meses';
import { FormBuilder, Validators } from '@angular/forms';
import { CalendarioPagoService } from '@core/api/services';
import { MessageService } from '@core/services/message.service';
import { DatetimeService } from '@core/services/datetime.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConceptoService, PlateClassService } from '@core/api/services';
import { CalendarioEliminarComponent } from '../eliminar/calendario-eliminar.component';
import { VentanaModalComponent } from '@feature/parametros/valores-cobros/components/ventana-modal/ventana-modal.component';
import { NON_WHITE_SPACE_REG_EXP } from '@core/utils/Patterns';
import { default as _rollupMoment } from 'moment';
import * as _moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { compareDate } from '@core/utils/FunctionDates';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-calendario-editar',
  templateUrl: './calendario-editar.component.html',
  styleUrls: ['./calendario-editar.component.scss'],
})
export class CalendarioEditarComponent implements OnInit {


  private subs = new SubSink();
  public mostrarSpinner = false;
  @Input() dataFromModalWindow: any;

  public conceptosCobroArr: any;
  public calendarioDePago: any;

  public tiposDePlaca = [];
  public placasForm: number[] = [];
  public arregloDeMeses: string[] = [];
  public placasArr: number[] = [0,1,2,3,4,5,6,7,8,9];
		disableButton = false;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private messageSvc: MessageService,
    private toastr: ToastrService,
    private datetimeSvc: DatetimeService,
    private conceptoCobroSvc: ConceptoService,
    private tiposDePlacaSvc: PlateClassService,
    private calendarioPagoSvc: CalendarioPagoService,
    public dialogRef: MatDialogRef<VentanaModalComponent>
  ) {
    this.setearMeses();
    this.setearConceptos();
    this.setearTiposDePlaca();
    this.mostrarSpinner = true;
  }

  public form = this.fb.group({
    estado:         [false, []],
    conceptosCobro: ['', [Validators.required]],
    mes:            ['', [Validators.required]],
    fechaInicio:    ['', [Validators.required]],
    fechaFin:       ['', [Validators.required]],
    placas:         ['', [Validators.required]],
    tipoPlaca:      ['', [Validators.required]],
    observaciones:  ['', [Validators.required, Validators.maxLength(200), Validators.pattern(NON_WHITE_SPACE_REG_EXP)]],
    nombre:         ['', [Validators.required, Validators.maxLength(100), Validators.pattern(NON_WHITE_SPACE_REG_EXP)]]
  });

  get formControl() { return this.form.controls; }

  ngOnInit(): void {
    this.setearFormulario();
  }

  private setearMeses(): void {
    this.arregloDeMeses = Object.keys(Meses);
  }

  private setearTiposDePlaca(): void {
    this.subs.add(
      this.tiposDePlacaSvc.getPlateClassUsingGET()
        .subscribe({
          next: data =>  this.tiposDePlaca = data,
          error: err => this.toastr.error(err)
        })
    );
   }

  private setearConceptos(): void {
    this.subs.add(
      this.conceptoCobroSvc.getDebitsEntityConceptUsingGET()
        .subscribe({
          next: data => this.conceptosCobroArr = data,
          error: err => this.toastr.error(err)
        })
    );
   }

  private setearFormulario(): void {
    const id = this.dataFromModalWindow.id;
    this.subs.add(
      this.calendarioPagoSvc.findByIdPayCalendarUsingGET(id)
        .subscribe({
          next: data => {
            this.calendarioDePago = data;
            data.tipoPlaca = this.filtrarArreglo(this.calendarioDePago.tipoPlaca, 'clasePlaca');
            this.form.patchValue({...this.calendarioDePago});
            this.form.controls.fechaInicio.setValue(
              data.fechaInicio ? moment(data.fechaInicio, 'YYYY-MM-DD') : null);
            this.form.controls.fechaFin.setValue(
              data.fechaFin ? moment(data.fechaFin, 'YYYY-MM-DD') : null);
          },
          error: err => {
            this.mostrarSpinner = false;
            this.toastr.error(err);
          },
          complete: () => this.mostrarSpinner = false
        })
    );
  }

  selectPlaca(event: any, checkboxValue: any): void {
    let placas = this.form.get('placas').value;

    if (event.checked && !placas.includes(checkboxValue)) {
      placas.push(checkboxValue);
    }
    else if (!event.checked && placas.includes(checkboxValue)) {
      placas = placas.filter(item => item !== checkboxValue);
    }
    this.form.get('placas').setValue(placas);
  }

  private filtrarArreglo(arregloAFiltrar : any,  filtro: any) {
    return arregloAFiltrar
     .map(item => item[filtro])
     .filter((value, index, self) => self.indexOf(value) === index)
     .sort((one, two) => (one > two ? 1 : -1));
  }

  onDelete(id: number): void {
    const dialogRef = this.dialog.open(VentanaModalComponent, {
      width: '40vw',
      disableClose: true,
      data: {
        dataComponent: { id, title: 'Eliminar calendario de pago' },
        component: CalendarioEliminarComponent
      }
    });



    this.subs.add(
     dialogRef.afterClosed().subscribe((flag) => {
						if(flag){
							this.dialogRef.close(true);
						}

					})
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      const mensaje = {
        titulo: 'Editar calendario de pago',
        cuerpo: '¿Está seguro que quiere modificar este calendario?'
      }
      this.messageSvc.confirmar(mensaje)
      .then(dialog => {
        if (dialog.isConfirmed) {
									this.mostrarSpinner = true;
									this.disableButton = true;
									const formulario = this.prepararDatosAntesDeEnviar(this.form.value);
          this.enviarFormulario(formulario);
        }
      });
    }
  }

  private prepararDatosAntesDeEnviar(datosDelFormulario: any): any {
    const formData = datosDelFormulario;
    formData.id = this.calendarioDePago.id;
    formData.tipoPlaca = this.crearArregloTipoPlaca(formData.tipoPlaca);
    return formData;
  }

  private enviarFormulario(formulario: any) {
    this.subs.add(
      this.calendarioPagoSvc.updatePayCalendarUsingPUT(formulario)
        .subscribe({
          next: data => {
            this.dialogRef.close(true);
            this.messageSvc.exito('Registo actualizado exitosamente');
												this.mostrarSpinner = false;
												this.disableButton = false;
          },
          error: err => {
            this.toastr.error(err);
												this.mostrarSpinner = false;
												this.disableButton = false;
          }
        })
				)
  }

  private crearArregloTipoPlaca(arregloDePlacas: string[]) {
    const limite = arregloDePlacas.length;
    const nuevoArreglo = [];
    for(let i=0; i<limite; i++) {
      nuevoArreglo.push({
        clasePlaca: arregloDePlacas[i]
      })
    }
    return nuevoArreglo;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

		onCloseDialog(): void {
			if (this.form.dirty) {
				const mensaje = {
					titulo: 'Editar calendario de pago',
					cuerpo: '¿Desea salir sin guardar los cambios?'
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

		validateDates(){
			const erroresFechaInicio = {};
	const erroresFechaFinal = {};
	let fechasInvalida = false;

			if (
		this.form.get("fechaInicio").value &&
		this.form.get("fechaFin").value
	){
					if (compareDate(this.form.get("fechaInicio").value, this.form.get("fechaFin").value) == 1) {
							erroresFechaFinal['outRange1'] =
								'La fecha fin no puede ser menor a la fecha inicio';
							fechasInvalida = true;
					} else {
							this.form.get("fechaFin").setErrors({ outRange1: null });
							this.form.get("fechaFin").updateValueAndValidity();
					}

					if (compareDate(this.form.get("fechaFin").value, this.form.get("fechaInicio").value) == 0) {
							erroresFechaInicio['outRange1'] =
									'La fecha inicio debe ser menor a la fecha fin';
							fechasInvalida = true;
					} else {
							this.form.get("fechaInicio").setErrors({ outRange1: null });
							this.form.get("fechaInicio").updateValueAndValidity();
					}

					for (const key in erroresFechaInicio) {
							this.form.get("fechaInicio").setErrors(erroresFechaInicio);
					}

					for (const key in erroresFechaFinal) {
							this.form.get("fechaFin").setErrors(erroresFechaFinal);
					}

			}
	}
}
