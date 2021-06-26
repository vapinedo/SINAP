import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PrescriptionCreate } from '@core/api/models';
import { ItemMenu } from '@core/api/models/item-menu';
import { DomainService, PrescriptionService } from '@core/api/services';
import { ConceptoService } from '@core/api/services/concepto.service';
import { Dominios } from '@core/models/Dominios';
import { ToastrService } from 'ngx-toastr';
import { FormatString } from '@core/utils/StringFuntion';
import { CREATE } from '@core/utils/Mensajes';
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
import { NON_WHITE_SPACE_REG_EXP, SOLO_NUMEROS } from '@core/utils/Patterns';

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
	selector: 'app-prescripciones-crear',
	templateUrl: './prescripciones-crear.component.html',
	styleUrls: ['./prescripciones-crear.component.scss'],
	providers: [
		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
		},

		{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
	],
})
export class PrescripcionesCrearComponent implements OnInit {
	public showSpinner = false;
	public dominioTiempo: ItemMenu[] = [];
	public dominioTipoConceptos: ItemMenu[] = [];
	public conceptosCobrar: ItemMenu[] = [];
	public formulario: FormGroup;
	today = new Date();
	disableButton = false;

	constructor(
		public dialogRef: MatDialogRef<PrescripcionesCrearComponent>,
		private domainService: DomainService,
		private ConceptoService: ConceptoService,
		private formBuilder: FormBuilder,
		private prescriptionService: PrescriptionService,
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
			tipoConcepto: new FormControl('', [Validators.required]),
			concepto: new FormControl('', [Validators.required]),
			idTiempo: new FormControl('', [Validators.required]),
			periodosVigentes: new FormControl('', [
				Validators.required,
				Validators.min(1),
				Validators.max(99),
				Validators.pattern(SOLO_NUMEROS),
			]),
			descripcion: new FormControl('', [
				Validators.minLength(3),
				Validators.maxLength(200),
				Validators.pattern(NON_WHITE_SPACE_REG_EXP),
			]),
			inicioVigencia: new FormControl('', [Validators.required]),
			finVigencia: new FormControl('', []),
			fechaAplicacion: new FormControl('', [
				Validators.pattern(/^(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])$/),
			]),
			estado: new FormControl(true, [Validators.required]),
		});
		this.cargarFiltros();
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
		this.domainService.getDomainsByIdUsingGET(Dominios.TIPOS_CONCEPTO).subscribe({
			next: (data) => {
				this.dominioTipoConceptos = data;
			},
			complete: () => (this.showSpinner = false),
		});
	}

	getConceptos(value: string): void {
		this.conceptosCobrar = [];
		if (value === 'CONCRED') {
			this.ConceptoService.getActiveConceptsCreditUsingGET().subscribe({
				next: (data) => {
					this.conceptosCobrar = data;
				},
				complete: () => (this.showSpinner = false),
			});
		}
		if (value === 'CONDEB') {
			this.ConceptoService.getActiveConceptsDebitUsingGET().subscribe({
				next: (data) => {
					this.conceptosCobrar = data;
				},
				complete: () => (this.showSpinner = false),
			});
		}
	}

	showConfirmarCrear(): void {
		this.dialog
			.open(ConfirmationDialogComponent, {
				data: {
					titulo: 'Crear prescripción',
					mensaje: 'Desea crear la prescripción',
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
					mensaje: '¿Desea salir sin guardar la información?',
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
			const prescriptionCreate = {} as PrescriptionCreate;
			prescriptionCreate.nombre = this.formularioControls.nombre.value;
			prescriptionCreate.tipoConcepto = this.formularioControls.tipoConcepto.value;
			prescriptionCreate.concepto = this.formularioControls.concepto.value;
			prescriptionCreate.periodosVigentes = this.formularioControls.periodosVigentes.value;
			prescriptionCreate.idTiempo = this.formularioControls.idTiempo.value;
			prescriptionCreate.descripcion = this.formularioControls.descripcion.value;
			prescriptionCreate.fechaAplicacion = this.formularioControls.fechaAplicacion.value;
			prescriptionCreate.inicioVigencia = this.formularioControls.inicioVigencia.value.format(
				'YYYY-MM-DD'
			);
			if (this.formularioControls.finVigencia.value) {
				prescriptionCreate.finVigencia = this.formularioControls.finVigencia?.value.format(
					'YYYY-MM-DD'
				);
			}

			prescriptionCreate.estado =
				this.formularioControls.estado.value == true ? 'A' : 'I';
			this.prescriptionService
				.savePrescriptionUsingPOST(prescriptionCreate)
				.subscribe({
					next: () => {
						this.toastr.success(FormatString(CREATE, 'Prescripcion'));
						this.dialogRef.close();
					},
					complete: () => {
						(this.showSpinner = false), (this.disableButton = false);
					},
					error: (err) => {
						this.toastr.error(err);
						this.showSpinner = false;
						this.disableButton = false;
					},
				});
		}
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
				this.formularioControls.idTiempo.value &&
				this.formularioControls.periodosVigentes.value &&
				this.formularioControls.inicioVigencia.value
			) {
				const cantidad = this.formularioControls.periodosVigentes.value;
				const periodos = this.formularioControls.idTiempo.value;
				const fechaInicio = this.formularioControls.inicioVigencia.value.format(
					'YYYY-MM-DD'
				);
				const fechaIFin = new Date(
					this.formularioControls.finVigencia.value.format('YYYY-MM-DD')
				);
				const date1 = new Date(fechaInicio);
				const fechaFinPeriodo = getFechaFinPeriodo(date1, cantidad, periodos);

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
	}
}
