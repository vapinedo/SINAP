import {
	Component,
	OnInit,
	ViewChild,
} from '@angular/core';

import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConceptoService, PrescriptionService } from '@core/api/services';
import { PrescriptionToTable } from '@core/api/models/prescription-to-table';
import { MatDialog } from '@angular/material/dialog';
import { PrescripcionesDetalleComponent } from './prescripciones-detalle/prescripciones-detalle.component';
import { PrescripcionesCrearComponent } from './prescripciones-crear/prescripciones-crear.component';
import { PrescripcionesModificarComponent } from './prescripciones-modificar/prescripciones-modificar.component';
import { MatSort } from '@angular/material/sort';

import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { dateToString } from '@core/utils/StringFuntion';
import { ConfirmationDialogComponent } from '@shared/confirmation-dialog/confirmation-dialog.component';
import { ItemMenu } from '@core/api/models';



@Component({
	selector: 'app-prescripciones-admin',
	templateUrl: './prescripciones-admin.component.html',
	styleUrls: ['./prescripciones-admin.component.scss'],
})
export class PrescripcionesAdminComponent implements OnInit {
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	private subscription1 = new Subscription();
	data: PrescriptionToTable[] = [];
	public dataSource = new MatTableDataSource(this.data);
	public showSpinner = false;
	public showProgressBar = false;


	filtroPeriodo: string[] = [];
	filtroVigencia: string[] = [];
	conceptosCobrar: ItemMenu[] = [];
	filtroEstado: string[] = [];


	periodoFilter = new FormControl('');
	vigenciaFilter = new FormControl('');
	conceptoFilter = new FormControl('');
	estadoFilter = new FormControl('');

	filterValues: any = {
		periodo: '',
		vigencia: '',
		concepto: '',
		estado: '',
	};
	displayColumns = [
		'nombre',
		'concepto',
		'periodosVigentes',
		'fechaAplicacion',
		'inicioVigencia',
		'finVigencia',
		'estado',
		'id',
	];

	constructor(
		private prescripcionSvc: PrescriptionService,
		public dialog: MatDialog,
		private toastr: ToastrService,
		private ConceptoService: ConceptoService
	) {}

	ngOnInit(): void {
		this.cargarTabla();
	}

	private fieldListener() {
		this.periodoFilter.valueChanges.subscribe((periodo) => {
			console.log(periodo);
			this.filterValues.periodo = periodo;
			this.dataSource.filter = JSON.stringify(this.filterValues);
		});
		this.conceptoFilter.valueChanges.subscribe((concepto) => {
			this.filterValues.concepto = concepto;
			this.dataSource.filter = JSON.stringify(this.filterValues);
		});
		this.vigenciaFilter.valueChanges.subscribe((vigencia) => {
			this.filterValues.vigencia = vigencia.replaceAll('/','-');
			this.dataSource.filter = JSON.stringify(this.filterValues);
		});
		this.estadoFilter.valueChanges.subscribe((estado) => {
			this.filterValues.estado = estado;
			this.dataSource.filter = JSON.stringify(this.filterValues);
		});
	}

	private createFilter(): (
		contact: PrescriptionToTable,
		filter: string
	) => boolean {
		const filterFunction = function (contact, filter): boolean {
			let searchTerms : any;

			try{
				 searchTerms = JSON.parse(filter);
					return (
						contact.periodo.includes(searchTerms.periodo) &&
						contact.concepto.includes(searchTerms.concepto)  &&
						(contact.fechaVigencia.slice(0,10).split('-').join('/')).includes(searchTerms.vigencia.split('-').join('/')) &&
						contact.estado.includes(searchTerms.estado)
					);
			}catch(error){
				filter = filter.toLowerCase();
				return (
					contact.periodo.toLowerCase().includes(filter)  ||
					contact.concepto.toLowerCase().includes(filter)  ||
					contact.fechaAplicacion.includes(filter)  ||
					dateToString(contact.fechaVigencia).startsWith(filter) ||
					dateToString(contact.finVigencia).includes(filter) ||
					contact.estado === (filter.charAt(0))  ||
					contact.nombre.toLowerCase().includes(filter)

				);
			}



		};

		return filterFunction;
	}



	clearFilter() : void {
		this.periodoFilter.setValue('');
		this.conceptoFilter.setValue('');
		this.vigenciaFilter.setValue('');
		this.estadoFilter.setValue('');
	}
	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.paginator._intl.itemsPerPageLabel = '';
	}
	cargarTabla() : void {
		this.showSpinner = true;
		this.prescripcionSvc.getPrescriptionsUsingGET().subscribe({
			next: (data) => {
				this.data = data;
				this.dataSource = new MatTableDataSource(data);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
				this.cargarDataFiltros();
				this.fieldListener();
				this.dataSource.filterPredicate = this.createFilter();
			},
			error: (err) => this.toastr.error(err),
			complete: () => (this.showSpinner = false),
		});
	}

	applyFilter(event: string) : void {
		//let filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = event;
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	ngOnDestroy(): void {
		this.subscription1.unsubscribe();
	}

	openDialogCrear(): void {
		const dialogRef = this.dialog.open(PrescripcionesCrearComponent, {});

		dialogRef.afterClosed().subscribe(() => {
			this.cargarTabla();
		});
	}

	cargarDataFiltros() : void {
		this.filtroPeriodo = this.filtrarPor('periodo');
		this.filtroVigencia = this.filtrarPor('fechaVigencia');
		this.filtroEstado = this.filtrarPor('estado');
		this.getConceposDebitos();
	}

	filtrarPor(filtro: string) : string []{
		return this.data
			.map((item) => item[filtro])
			.filter((value, index, self) => self.indexOf(value) === index)
			.sort((one, two) => (one > two ? 1 : -1));
	}

	getConceposDebitos() : void {
		this.ConceptoService.getActiveConceptsDebitUsingGET().subscribe({
			next: (data) => {
				this.conceptosCobrar = data;
			},
			complete: () => (this.showSpinner = false),
		});
	}

	onSelectChange(optionSelected: string) : void {
		this.applyFilter2(optionSelected);
	}

	applyFilter2(value: string): void {
		const filterValue = value.trim().toLowerCase();
		this.dataSource.filter = filterValue;
	}

	openDialogModificar(id: number): void {
		const dialogRef = this.dialog.open(PrescripcionesModificarComponent, {
			data: id,
		});

		dialogRef.afterClosed().subscribe(() => {
			this.cargarTabla();
		});
	}

	openDialogDetalle(id: string): void {
		const dialogRef = this.dialog.open(PrescripcionesDetalleComponent, {
			data: id,
		});

		dialogRef.afterClosed().subscribe(() => {
			//this.cargarTabla();
		});
	}

	mostrarDialogo(): void {
		this.dialog
				.open(ConfirmationDialogComponent, {
						data: { titulo : 'Hola', mensaje : 'Desaea eliminar ' }
				})
				.afterClosed()
				.subscribe((confirmado) => {
						if (confirmado) {
								console.log("confirmado");
						} else {
							console.log("no confirmado");
						}
				});
}

}
