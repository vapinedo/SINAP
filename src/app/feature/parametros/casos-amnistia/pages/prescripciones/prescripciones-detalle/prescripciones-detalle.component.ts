import { Component, Inject, OnInit } from '@angular/core';
import {
	MatDialog,
	MatDialogRef,
	MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PrescriptionToDetail } from '@core/api/models/prescription-to-detail';
import { PrescriptionService } from '@core/api/services';
import { ToastrService } from 'ngx-toastr';
import { PrescripcionesEliminarComponent } from '../prescripciones-eliminar/prescripciones-eliminar.component';

@Component({
	selector: 'app-prescripciones-detalle',
	templateUrl: './prescripciones-detalle.component.html',
	styleUrls: ['./prescripciones-detalle.component.scss'],
})
export class PrescripcionesDetalleComponent implements OnInit {
	public showSpinner = false;
	prescriptionToDetail: PrescriptionToDetail;

	constructor(
		public dialogRef: MatDialogRef<PrescripcionesDetalleComponent>,
		@Inject(MAT_DIALOG_DATA) public data: number,
		public prescriptionService: PrescriptionService,
		public dialog: MatDialog,
		private toastr: ToastrService
	) {}

	onCloseDialog(): void {
		this.dialogRef.close();
	}

	ngOnInit(): void {
		this.getDetalle();
	}

	getDetalle() : void {
		this.prescriptionService.getPrescriptionsByidUsingGET(this.data).subscribe({
			next: (data) => {
				this.prescriptionToDetail = data;
			},
			complete: () => (this.showSpinner = false),
			//error: (err) => this.dialogSvc.error(err),
		});
	}





}
