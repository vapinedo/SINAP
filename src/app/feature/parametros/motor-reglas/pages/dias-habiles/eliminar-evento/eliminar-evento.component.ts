import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConceptoService, ParFeriadoService } from '@core/api/services';
import { MessageService } from '@core/services/message.service';
import { NON_WHITE_SPACE_REG_EXP } from '@core/utils/Patterns';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-eliminar-evento',
  templateUrl: './eliminar-evento.component.html',
  styleUrls: ['./eliminar-evento.component.scss']
})
export class EliminarEventoComponent implements OnInit {

	@Input() dataFromModalWindow: any;

  	public showSpinner = false;
	public formulario: FormGroup;

	constructor(
		public dialogRef: MatDialogRef<EliminarEventoComponent>,		
		private formBuilder: FormBuilder,		
		private dialogSvc: MessageService,
		private toastr: ToastrService,
		private feriadosSvc: ParFeriadoService
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
				titulo: 'Eliminar evento',
				cuerpo: '¿Desea salir sin confirmar los cambios?'
		}
			this.dialogSvc.confirmar(mensaje)
			.then((result) => {
				if (result.isConfirmed) {
					this.closeModal(flag);					
				}
			});
		} else {
			this.closeModal(flag);			
		}
	}

	get formularioControls() {
		return this.formulario.controls;
	}

	eliminar(): void {
		this.showSpinner = true;
		
		let request: ParFeriadoService.GetHolidayToEventsUsingDELETEParams ={
			observacion :this.formulario.get('observacion').value,
			id : this.dataFromModalWindow.id
		}

		this.feriadosSvc.getHolidayToEventsUsingDELETE(request)
			.subscribe({
				next: () => {
					this.toastr.success('Evento eliminado correctamente');
					this.dialogRef.close(true);
				},
				complete: () => {
					(this.showSpinner = false);
				},
				error: (err) => {
					this.toastr.error(err);
					this.showSpinner = false;
				}
			});
	}

	closeModal(flag: boolean): void {
		this.dialogRef.close(flag);
	}
}
