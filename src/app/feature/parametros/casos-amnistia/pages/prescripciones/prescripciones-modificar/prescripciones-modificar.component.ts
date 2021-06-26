import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import {
	MatDialog,
	MatDialogRef,
	MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ItemMenu } from '@core/api/models/item-menu';
import { PrescriptionToDetail } from '@core/api/models/prescription-to-detail';
import { PrescriptionUpdate } from '@core/api/models/prescription-update';
import { DomainService, PrescriptionService } from '@core/api/services';
import { ConceptoService } from '@core/api/services/concepto.service';
import { Dominios } from '@core/models/Dominios';
import { UPDATE } from '@core/utils/Mensajes';
import { FormatString } from '@core/utils/StringFuntion';
import { MessageService } from '@core/services/message.service';
import { ToastrService } from 'ngx-toastr';
import { compareDate, getFechaFinPeriodo } from '@core/utils/FunctionDates';
import { ConfirmationDialogComponent } from '@shared/confirmation-dialog/confirmation-dialog.component';

import {
	MomentDateAdapter,
	MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
	DateAdapter,
	MAT_DATE_FORMATS,
	MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
import { PrescripcionesEliminarComponent } from '../prescripciones-eliminar/prescripciones-eliminar.component';
import { NON_WHITE_SPACE_REG_EXP } from '@core/utils/Patterns';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
	parse: {
		dateInput: 'YYYY/MM/DD',
	},
	display: {
		dateInput: 'YYYY/MM/DD',
		monthYearLabel: 'MMM YYYY',
		dateA11yLabel: 'LL',
		monthYearA11yLabel: 'MMMM YYYY',
	},
};
@Component({
	selector: 'app-prescripciones-modificar',
	templateUrl: './prescripciones-modificar.component.html',
	styleUrls: [],
	providers: [
		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
		},

		{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
	],
})
export class PrescripcionesModificarComponent implements OnInit {
	public showSpinner = false;
	public dominioTiempo: ItemMenu[] = [];
	public conceptosCobrar: ItemMenu[] = [];
	public formulario: FormGroup;
	prescriptionToDetail: PrescriptionToDetail;
	disableButton = false;

	constructor(
		public dialogRef: MatDialogRef<PrescripcionesModificarComponent>,
		@Inject(MAT_DIALOG_DATA) public data: number,
		private domainService: DomainService,
		private ConceptoService: ConceptoService,
		private formBuilder: FormBuilder,
		private prescriptionService: PrescriptionService,
		private dialogSvc: MessageService,
		private toastr: ToastrService,
		public dialog: MatDialog
	) {
		dialogRef.disableClose = true;
	}

	ngOnInit(): void {
		this.formulario = this.formBuilder.group({
			nombre: new FormControl('', [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100),
				Validators.pattern(NON_WHITE_SPACE_REG_EXP),
			]),
			observacion: new FormControl('', [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(200),
				Validators.pattern(NON_WHITE_SPACE_REG_EXP),
			]),
			descripcion: new FormControl({
				value: '',
			}),
			tipoConcepto: new FormControl('', []),
			nombreConcepto: new FormControl('', []),
			periodo: new FormControl('', []),
			periodosVigentes: new FormControl('', [
				Validators.required,
				Validators.min(1),
				Validators.max(99),
			]),
			inicioVigencia: new FormControl('', [Validators.required]),
			finVigencia: new FormControl('', []),
			fechaAplicacion: new FormControl('', [
				Validators.pattern(/^(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])$/),
			]),
			estado: new FormControl(true, [Validators.required]),
		});
		this.cargarFiltros();
		this.getDetalle();
	}

	getDetalle(): void {
		this.prescriptionService.getPrescriptionsByidUsingGET(this.data).subscribe({
			next: (data) => {
				this.prescriptionToDetail = data;
				this.formulario.patchValue(data);
				this.formularioControls.inicioVigencia.setValue(
					moment(this.prescriptionToDetail.inicioVigencia, 'YYYY-MM-DD')
				);
				if (this.prescriptionToDetail.finVigencia) {
					this.formularioControls.finVigencia.setValue(
						moment(this.prescriptionToDetail.finVigencia, 'YYYY-MM-DD')
					);
				}

				this.formularioControls.estado.setValue(
					this.prescriptionToDetail.estado == 'A'
				);
			},
			complete: () => (this.showSpinner = false),
			//error: (err) => this.dialogSvc.error(err),
		});
	}

	onCloseDialog(): void {
		if (this.formulario.dirty) {
			this.showConfirmarSalir();
		} else {
			this.dialogRef.close();
		}
	}

	get formularioControls() {
		return this.formulario.controls;
	}

	cargarFiltros(): void {
		this.domainService
			.getDomainsByIdUsingGET(Dominios.TIEMPO_PRESCRIPCION)
			.subscribe({
				next: (data) => {
					this.dominioTiempo = data;
				},
				complete: () => (this.showSpinner = false),
			});
		this.ConceptoService.getActiveConceptsDebitUsingGET().subscribe({
			next: (data) => {
				this.conceptosCobrar = data;
			},
			complete: () => (this.showSpinner = false),
		});
	}

	editar(): void {
		this.dialog
			.open(ConfirmationDialogComponent, {
				data: {
					titulo: 'Editar prescripción',
					mensaje: '¿Está seguro que quiere modificar esta prescripción?',
				},
			})
			.afterClosed()
			.subscribe((confirmado) => {
				if (confirmado) {
					this.crear();
				}
			});
	}
	showConfirmarSalir(): void {
		this.dialog
			.open(ConfirmationDialogComponent, {
				data: {
					titulo: 'Creación incompleta',
					mensaje: '¿Desea salir sin guardar los cambios?',
				},
			})
			.afterClosed()
			.subscribe((confirmado) => {
				if (confirmado) {
					this.dialogRef.close();
				}
			});
	}
	crear(): void {
		this.showSpinner = true;
		if (this.formulario.valid) {
			this.disableButton = true;
			const prescriptionUpdate = {} as PrescriptionUpdate;
			prescriptionUpdate.id = this.data;
			prescriptionUpdate.inicioVigencia = this.formularioControls.inicioVigencia.value.format(
				'YYYY-MM-DD'
			);
			if (this.formularioControls.finVigencia.value) {
				prescriptionUpdate.finVigencia = this.formularioControls.finVigencia.value.format(
					'YYYY-MM-DD'
				);
			} else {
				prescriptionUpdate.finVigencia = null;
			}
			prescriptionUpdate.observacion = this.formularioControls.observacion.value;
			prescriptionUpdate.nombre = this.formularioControls.nombre.value;
			prescriptionUpdate.estado =
				this.formularioControls.estado.value == true ? 'A' : 'I';

			this.prescriptionService
				.updatePrescriptionUsingPATCH(prescriptionUpdate)
				.subscribe({
					next: () => {
						this.toastr.success(FormatString(UPDATE, 'Prescripcion'));
						this.dialogRef.close();
					},
					complete: () => {
						this.showSpinner = false;
						this.disableButton = false;
					},
					error: (err) => {
						this.toastr.error(err);
						this.showSpinner = false;
						this.disableButton = false;
					},
				});
		}
	}

	changeDate(date: string): string {
		const newDate = new Date(date);
		return formatDate(newDate, 'yyyy/MM/dd', 'en-US');
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	eventDates(type: string, event: MatDatepickerInputEvent<Date>) {
		this.validarFechas();
	}

	validarFechas(): void {
		const erroresFechaInicio = {};
		const erroresFechaFinal = {};
		let fechasInvalida = false;

		if (
			this.formularioControls.finVigencia.value &&
			this.formularioControls.inicioVigencia.value
		) {
			console.log(this.formularioControls.inicioVigencia.value);
			const fechaInicio = new Date(
				this.formularioControls.inicioVigencia.value.format('YYYY-MM-DD')
			);
			const fechaIFin = new Date(
				this.formularioControls.finVigencia.value.format('YYYY-MM-DD')
			);

			if (compareDate(fechaInicio, fechaIFin) == 1) {
				erroresFechaInicio['outRange1'] =
					'La fecha inicio debe ser menor a la fecha fin';
				fechasInvalida = true;
			} else {
				this.formularioControls.inicioVigencia.setErrors({ outRange1: null });
				this.formularioControls.inicioVigencia.updateValueAndValidity();
			}

			if (compareDate(fechaIFin, fechaInicio) == -1) {
				erroresFechaFinal['outRange1'] =
					'La fecha fin no puede ser menor a la fecha inicio';
				fechasInvalida = true;
			} else {
				this.formularioControls.finVigencia.setErrors({ outRange1: null });
				this.formularioControls.finVigencia.updateValueAndValidity();
			}
		}

		if (!fechasInvalida) {
			// Validacion de fecha fin por periodo
			if (
				this.formularioControls.finVigencia.value &&
				this.prescriptionToDetail.idTiempo &&
				this.prescriptionToDetail.periodosVigentes &&
				this.formularioControls.inicioVigencia.value
			) {
				const cantidad = this.prescriptionToDetail.periodosVigentes;
				const periodos = this.prescriptionToDetail.idTiempo;
				const fechaInicio = this.formularioControls.inicioVigencia.value.format(
					'YYYY-MM-DD'
				);
				const fechaIFin = new Date(
					this.formularioControls.finVigencia.value.format('YYYY-MM-DD')
				);
				const date1 = new Date(fechaInicio);
				const fechaFinPeriodo = getFechaFinPeriodo(date1, cantidad, periodos);
				console.log(fechaFinPeriodo);
				if (compareDate(fechaIFin, fechaFinPeriodo) == -1) {
					erroresFechaFinal['validatePeriodos'] =
						'La fecha fin de vigencia no puede ser menor a los periodos vigentes';
				} else {
					this.formularioControls.finVigencia.setErrors({ validatePeriodos: null });
					this.formularioControls.finVigencia.updateValueAndValidity();
				}
			}
		}
		for (const key in erroresFechaInicio) {
			this.formularioControls.inicioVigencia.setErrors(erroresFechaInicio);
		}

		for (const key in erroresFechaFinal) {
			this.formularioControls.finVigencia.setErrors(erroresFechaFinal);
		}
		this.formularioControls.finVigencia.markAsTouched();
		this.formularioControls.finVigencia.markAsDirty();
	}

	openDialogEliminar(): void {
		const dialogEliminar = this.dialog.open(PrescripcionesEliminarComponent, {
			data: this.prescriptionToDetail,
		});

		dialogEliminar.afterClosed().subscribe((flag) => {
			if(flag){
				this.dialogRef.close();
			}

		});
	}
}
