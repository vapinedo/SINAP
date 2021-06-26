import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleTramiteBanco } from '@core/api/models';
import { DetalleTramiteService } from '@core/api/services';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-det-novedades-banco',
	templateUrl: './det-novedades-banco.component.html',
	styleUrls: ['./det-novedades-banco.component.scss'],
})
export class DetNovedadesBancoComponent implements OnInit {
	iduVehiculo: string;
	periodo: any;

	public showSpinner = false;
	public showProgressBar = false;
	data: DetalleTramiteBanco[] = [];
	public dataSource = new MatTableDataSource(this.data);

	public mensaje: String = 'No se encontro datos';

	@ViewChild(MatPaginator) paginator: any;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatTable) table!: MatTable<any>;
	selection = new SelectionModel<any>(true, []);
	displayColumns = [
		'nroComprobante',
		'placa',
		'descripcion',
		'periodo',
		'fechaTransaccion',
		'estadoPublicacion',
		'acciones',
	];

	constructor(
		private detalleTramiteSvc: DetalleTramiteService,
		private toastr: ToastrService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.iduVehiculo = this.activatedRoute.snapshot.paramMap.get('idu_vehiculo');
		this.periodo = this.activatedRoute.snapshot.paramMap.get('periodo');
		this.getDetalleNovedades();
	}

	applyFilter(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	getDetalleNovedades() {
		this.showSpinner = true;
		this.data = [];
		this.detalleTramiteSvc
			.findAllDetalleTramiteBancoUsingGET(Number(this.iduVehiculo))
			.subscribe({
				next: (data) => {
					console.log('Rs svc banco', data);
					this.data = data;
					this.dataSource = new MatTableDataSource(data);
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
				},
				error: (err) => {
					this.showSpinner = false;
					this.toastr.error('Ha ocurrido un error, por favor intente más tarde');
				},
				complete: () => (this.showSpinner = false),
			});
	}

	goBack(): void {
		this.router.navigateByUrl('/consultas/vehiculares/estado-cuenta-vehicular');
	}
}
