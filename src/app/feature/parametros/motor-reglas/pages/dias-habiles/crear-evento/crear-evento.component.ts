import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemMenu } from '@core/api/models';
import { HolidayCreate } from '@core/api/models/holiday-create';
import { ConceptoService } from '@core/api/services';
import { ParFeriadoService } from '@core/api/services/par-feriado.service';
import { NON_CHAR_SPECIAL_REG_EXP } from '@core/utils/Patterns';
import { VentanaModalComponent } from '@feature/parametros/valores-cobros/components/ventana-modal/ventana-modal.component';
import { ConfirmationDialogComponent } from '@shared/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-crear-evento',
	templateUrl: './crear-evento.component.html',
	styleUrls: ['./crear-evento.component.scss']
})
export class CrearEventoComponent implements OnInit {

	@ViewChild('allSelected') private allSelected: MatOption;	
	public form = this.fb.group({
		variable: ['', [Validators.required,
						Validators.maxLength(200),
			            Validators.pattern(NON_CHAR_SPECIAL_REG_EXP)						
				  ]],
		fechaEvento: ['', [Validators.required]],
		conceptos: [[], [Validators.required]],
		repetir: [true]
	});

	public showSpinner = false;
	private subscription1 = new Subscription();
	concepts: ItemMenu[] = [];
	nombreEvento: String;

	constructor(private fb: FormBuilder,
		public dialogRef: MatDialogRef<VentanaModalComponent>,
		public dialog: MatDialog,
		private feriadosSvc: ParFeriadoService,
		private toastr: ToastrService,
		private ConceptoService: ConceptoService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		dialogRef.disableClose = true;
	}		

	ngOnInit(): void {
		this.nombreEvento = this.data.name;
		this.getConcepts();
	}


	getConcepts() {
		this.subscription1 = this.ConceptoService.getActiveConceptsDebitUsingGET()
			.subscribe({
				next: data => {
					this.concepts = data;
				},
				error: err => {
					this.toastr.error(err || 'No se ha logrado consultar el listado de conceptos a cobrar');
				}
			});
	}

	onSubmit() {
		this.showSpinner = true;

		let nacional = 'N';

		if (!this.data.idMunicipio && !this.data.idDepartamento
			&& !this.data.codBanco && !this.data.idEntidad) {
			nacional = 'S';
		}

		var indice =  this.form.get('conceptos').value.indexOf(0);		
		if(indice !== -1){
			this.form.get('conceptos').value.splice(indice, 1);
		}
		

		let holiday: HolidayCreate = {
			"fecha": this.form.get('fechaEvento').value,
			"nombre": this.form.get('variable').value,
			"repiteAnno": this.form.get('repetir').value ? 'S' : 'N',
			"idConceptos": this.form.get('conceptos').value,
			"idMunicipio": this.data.idMunicipio,
			"idDepartamento": this.data.idDepartamento,
			"nacional": nacional,
			"codBanco": this.data.codBanco,
			"idEntidad": this.data.idEntidad
		}

		this.feriadosSvc.saveHolidayCreateUsingPOST(holiday)
			.subscribe({
				next: () => {
					this.toastr.success('Evento creado correctamente');
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

	changeEvento(event) {
		this.form.get('repetir').setValue(event.checked);
	}

	onCloseDialog(): void {
		if (this.form.dirty) {
			this.showConfirmarSalir();
		} else {
			this.dialogRef.close();
		}
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

	showConfirmarCrear(): void {
		this.dialog
			.open(ConfirmationDialogComponent, {
				data: {
					titulo: 'Crear evento',
					mensaje: '¿Está seguro que quiere crear este evento?',
				},
			})
			.afterClosed()
			.subscribe((confirmado) => {
				if (confirmado) {
					this.onSubmit();
				}
			});
	}

	toggleAllSelection() {
		if (this.allSelected.selected) {
			this.form.get('conceptos')
				.patchValue([...this.concepts.map(item => item.id), 0]);
		} else {
			this.form.get('conceptos').patchValue([]);
		}
	}

	tosslePerOne(all) {
		if (this.allSelected.selected) {
			this.allSelected.deselect();
			return false;
		}

		if (this.form.get('conceptos').value.length == this.concepts.length)
			this.allSelected.select();

	}

}
