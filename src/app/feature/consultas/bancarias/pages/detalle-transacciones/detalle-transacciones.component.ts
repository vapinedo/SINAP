import {  Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
	DetalleTransacciones,
	DetalleTransaccionesToTable,
} from '@core/api/models';
import { TransaccionesService } from '@core/api/services';

@Component({
	selector: 'app-detalle-transacciones',
	templateUrl: './detalle-transacciones.component.html',
	styleUrls: ['./detalle-transacciones.component.scss'],
})
export class DetalleTransaccionesComponent implements OnInit {
	@Input() iduVehiculo: string;
	@Input() periodo: string;
	@Input() tipoTasa: string;

	detalleTransacciones: DetalleTransacciones;
	data: DetalleTransaccionesToTable[] = [];
	public dataSource = new MatTableDataSource(this.data);

	public showSpinner = false;
	showMulta = false;

	displayColumns = [
		'noComprobante',
		'fechaPago',
		'fechaVencimiento',
		'naturaleza',
		'motivo',
		'valorImpuesto',
		'valorMulta',
		'periodosAnteriores',
		'excedente',
		'total',
	];

	displayColumnsFooter = [
		'detalles',
		'valorImpuesto',
		'valorMulta',
		'periodosAnteriores',
		'excedente',
		'total',
	];

	constructor(private transaccionesService: TransaccionesService) {}

	ngOnInit(): void {
		if(this.tipoTasa == 'CCS21'){
			this.displayColumns = [
				'noComprobante',
				'fechaPago',
				'fechaVencimiento',
				'naturaleza',
				'motivo',
				'valorImpuesto',
				'periodosAnteriores',
				'excedente',
				'total',
			];
			this.displayColumnsFooter = [
				'detalles',
				'valorImpuesto',
				'periodosAnteriores',
				'excedente',
				'total',
			];

		}
		this.getTransacciones();
	}



	getTransacciones(): void {
		const params = {} as TransaccionesService.GetPrescriptionsByidUsingGET1Params;
		params.iduVehiculo = Number(this.iduVehiculo);
		params.periodo = this.periodo;
		params.tipoTasa = this.tipoTasa;
		this.transaccionesService.getPrescriptionsByidUsingGET1(params).subscribe({
			next: (data) => {
				this.detalleTransacciones = data;
				this.data = data.detalle;
				this.dataSource = new MatTableDataSource(data.detalle);
			},
			error: (err) => {
				this.showSpinner = false;
			},
			complete: () => (this.showSpinner = false),
		});
	}
}
