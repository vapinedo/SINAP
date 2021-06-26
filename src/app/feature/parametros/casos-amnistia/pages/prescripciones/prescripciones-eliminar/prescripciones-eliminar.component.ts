import { Component, Inject, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrescriptionDelete } from '@core/api/models/prescription-delete';
import { PrescriptionToDetail } from '@core/api/models/prescription-to-detail';
import { PrescriptionService } from '@core/api/services';
import { DELETE } from '@core/utils/Mensajes';
import { FormatString } from '@core/utils/StringFuntion';
import { MessageService } from '@core/services/message.service';
import { ToastrService } from 'ngx-toastr';
import { NON_WHITE_SPACE_REG_EXP } from '@core/utils/Patterns';

@Component({
	selector: 'app-prescripciones-eliminar',
	templateUrl: './prescripciones-eliminar.component.html',
	styleUrls: [],
})
export class PrescripcionesEliminarComponent implements OnInit {
	public showSpinner = false;
	public formulario: FormGroup;

	constructor(
		public dialogRef: MatDialogRef<PrescripcionesEliminarComponent>,
		@Inject(MAT_DIALOG_DATA) public data: PrescriptionToDetail,
		private formBuilder: FormBuilder,
		private prescriptionService: PrescriptionService,
		private dialogSvc: MessageService,
		private toastr: ToastrService
	) {
		dialogRef.disableClose = true;
	}

	ngOnInit(): void {
		this.formulario = this.formBuilder.group({
			observacion: new FormControl('', [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(200),
				Validators.pattern(NON_WHITE_SPACE_REG_EXP),
			]),
		});
	}

	onCloseDialog(flag : boolean): void {
		if (this.formulario.dirty) {
			const mensaje = {
				titulo: 'Eliminar prescripción',
				cuerpo: '¿Desea salir sin confirmar los cambios?'
		}
			this.dialogSvc.confirmar(mensaje)
			.then((result) => {
				if (result.isConfirmed) {
					this.closeModal(flag);
					//this.dialogRef.close();
				}
			});
		} else {
			this.closeModal(flag);
			//this.dialogRef.close();
		}
	}

	get formularioControls() {
		return this.formulario.controls;
	}

	eliminar(): void {
		this.showSpinner = true;
		if (this.formulario.valid) {
			const prescriptionDelete = {} as PrescriptionDelete;
			prescriptionDelete.id = this.data.id;
			prescriptionDelete.observacion = this.formularioControls.observacion.value;
			this.prescriptionService
				.deletePrescriptionUsingDELETE(prescriptionDelete)
				.subscribe({
					next: () => {
						this.toastr.success(FormatString(DELETE, 'Prescripcion'));
						this.closeModal(true);
					},
					complete: () => (this.showSpinner = false),
					error: (err) => this.dialogSvc.error(err),
				});
		}
	}

	closeModal(flag: boolean): void {
		this.dialogRef.close(flag);
	}
}
