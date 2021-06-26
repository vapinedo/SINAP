import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ItemMenu } from '@core/api/models';
import { HolidayUpdate } from '@core/api/models/holiday-update';
import { ConceptoService } from '@core/api/services';
import { ParFeriadoService } from '@core/api/services/par-feriado.service';
import { NON_CHAR_SPECIAL_REG_EXP } from '@core/utils/Patterns';
import { VentanaModalComponent } from '@feature/parametros/valores-cobros/components/ventana-modal/ventana-modal.component';
import { ConfirmationDialogComponent } from '@shared/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
@Component({
	selector: 'app-editar-evento',
	templateUrl: './editar-evento.component.html',
	styleUrls: ['./editar-evento.component.scss']
})
export class EditarEventoComponent implements OnInit {

	@ViewChild('allSelected') private allSelected: MatOption;
	@Input() dataFromModalWindow: any;

	public form = this.fb.group({
		variable: ['', [Validators.required,
						Validators.maxLength(200),
						Validators.pattern(NON_CHAR_SPECIAL_REG_EXP)						
	  ]],
		fechaEvento: ['', [Validators.required]],
		conceptos: [[], [Validators.required]],
		repetir: [false],
		observacion: ['', [Validators.required,
						   Validators.maxLength(200)			
		]]
	});

	public showSpinner = false;
	private subscription1 = new Subscription();
	concepts: ItemMenu[] = [];

	constructor(private fb: FormBuilder,
		public dialogRef: MatDialogRef<VentanaModalComponent>,
		public dialog: MatDialog,
		private feriadosSvc: ParFeriadoService,
		private toastr: ToastrService,
		private ConceptoService: ConceptoService) { }

	ngOnInit(): void {		
		this.getConcepts();				
	}

	setForm(){
		this.form.get('fechaEvento').setValue(new Date(this.dataFromModalWindow.node.fecha));
		this.form.get('variable').setValue(this.dataFromModalWindow.node.nombre,);
		this.form.get('repetir').setValue(this.dataFromModalWindow.node.repiteAnno==='S'?true:false);
		this.form.get('conceptos').setValue(this.filtrarConceptos(this.dataFromModalWindow.node.idConceptos));
		this.form.get('observacion').setValue(this.dataFromModalWindow.node.observacion);
	}

	private filtrarConceptos(arregloAFiltrar : any) {
		let concept = [];
		arregloAFiltrar.forEach(element => {
			let findConcept = this.concepts.filter(item => item.id == element);
			concept.push(findConcept[0]);
		});		
		return concept;
	  }

	getConcepts() {
		this.subscription1 = this.ConceptoService.getActiveConceptsDebitUsingGET()
			.subscribe({
				next: data => {
					this.concepts = data;
					this.setForm();
				},
				error: err => {
					this.toastr.error(err || 'No se ha logrado consultar el listado de conceptos a cobrar');
				}
			});
	}

	onSubmit() {
		this.showSpinner = true;
		let nacional = 'N';
		if (!this.dataFromModalWindow.node.idMunicipio && !this.dataFromModalWindow.node.idDepartamento
			&& !this.dataFromModalWindow.node.codBanco && !this.dataFromModalWindow.node.idEntidad) {
			nacional = 'S';
		}			
		let idConcepts = [];
		let conceptos = this.form.get('conceptos').value;
		conceptos.forEach(element => {
			idConcepts.push(element.id);
		});

		var indice =conceptos.indexOf(0);
		conceptos.splice(indice, 1);

		let holiday: HolidayUpdate = {
			"id": this.dataFromModalWindow.node.id,
			"fecha": this.form.get('fechaEvento').value,
			"nombre": this.form.get('variable').value,
			"repiteAnno": this.form.get('repetir').value ? 'S' : 'N',
			"idConceptos": idConcepts,
			"idMunicipio": this.dataFromModalWindow.node.idMunicipio,
			"idDepartamento": this.dataFromModalWindow.node.idDepartamento,
			"nacional": nacional,
			"codBanco": this.dataFromModalWindow.node.codBanco,
			"idEntidad": this.dataFromModalWindow.node.idEntidad,
			"observacion": this.form.get('observacion').value
		}

		this.feriadosSvc.updateHolidayCreateUsingPUT(holiday)
			.subscribe({
				next: () => {
					this.toastr.success('Evento actualizado correctamente');
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
					titulo: 'Edición incompleta',
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

	showConfirmarEditar(): void {
		this.dialog
			.open(ConfirmationDialogComponent, {
				data: {
					titulo: 'Editar evento',
					mensaje: '¿Está seguro que quiere editar este evento?',
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

