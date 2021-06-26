import { Component, OnInit, ViewChild } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemMenu } from '@core/api/models';
import { ConsultaMatriculaToTable } from '@core/api/models/consulta-matricula-to-table';
import { FiltroConsultaMatricula } from '@core/api/models/filtro-consulta-matricula';
import { PropVehiculosService } from '@core/api/services';
import { StorageService } from '@core/services/storage.service';
import { NON_CHAR_SPECIAL_REG_EXP, SOLO_NUMEROS } from '@core/utils/Patterns';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-estado-cuenta-vehicular',
	templateUrl: './estado-cuenta-vehicular.component.html',
	styleUrls: ['./estado-cuenta-vehicular.component.scss'],
})
export class EstadoCuentaVehicularComponent implements OnInit {
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	public formulario: FormGroup;
	public showSpinner = false;
	public clasePlacas: ItemMenu[] = [];
	public afectaciones: ItemMenu[] = [];
	public textSelect = 'Seleccione una..';
	disableButton = false;
	data: ConsultaMatriculaToTable[] = [];
	public dataSource = new MatTableDataSource(this.data);
	limpiarForm : string;

	displayColumns = [
		'nroComprobante',
		'placa',
		'periodo',
		'saldoTUAV',
		'saldoTVM',
		'saldoSXXI',
		'valorPlaca',
		'saldoTotal',
		'excento',
		'bloqueo',
		'planPlago',
		'iduVehiculo',
	];

	class1 = 'col-md-2';
	class2 = 'col-md-8';
	class3 = 'col-md-2';

	constructor(
		private formBuilder: FormBuilder,
		private propVehiculosService: PropVehiculosService,
		private toastr: ToastrService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private storageService: StorageService
	) {}

	ngOnInit(): void {
		this.formulario = this.formBuilder.group({
			rtnNumerico: new FormControl('', [
				Validators.minLength(14),
				Validators.maxLength(14),
				Validators.pattern(SOLO_NUMEROS),
			]),
			rtnAlfanumerico: new FormControl('', [
				Validators.minLength(7),
				Validators.maxLength(7),
				Validators.pattern(NON_CHAR_SPECIAL_REG_EXP),
			]),
			placa: new FormControl('', [
				Validators.minLength(7),
				Validators.maxLength(7),
				Validators.pattern(NON_CHAR_SPECIAL_REG_EXP),
			]),
			nroComprobante: new FormControl('', [
				Validators.minLength(11),
				Validators.maxLength(11),
				Validators.pattern(SOLO_NUMEROS),
			]),
			afectacion: new FormControl({ value: '', disabled: true }),
			clasePlaca: new FormControl({ value: '', disabled: true }),
		});
		this.limpiarForm = this.activatedRoute.snapshot.paramMap.get('limpiar_form');

		if(this.limpiarForm === 'true'){
				this.formulario.reset();
				this.storageService.deleteItem('filtroConsulta');
		}
			if (this.storageService.keyExists('filtroConsulta')) {

				this.formulario.patchValue(this.storageService.getItem('filtroConsulta'));
				this.consultar();
				if(this.formularioControls.rtnNumerico.value || this.formularioControls.rtnAlfanumerico.value){
						this.getClasePlacaAfectaciones();
				}
			}


	}

	get formularioControls() {
		return this.formulario.controls;
	}

	getClasePlacaAfectaciones(): void {
		if (
			(this.formularioControls.rtnAlfanumerico.value &&
				this.formularioControls.rtnAlfanumerico.valid) ||
			(this.formularioControls.rtnNumerico.value &&
				this.formularioControls.rtnNumerico.valid)
		) {
			const rtnAlfanumerico = this.formularioControls.rtnAlfanumerico.value;
			const rtnNumerico = this.formularioControls.rtnNumerico.value;
			const params = {} as PropVehiculosService.GetAfectacionesByRNTUsingGETParams;
			if (rtnAlfanumerico && this.formularioControls.rtnAlfanumerico.valid) {
				params.rtnAlfanumerico = rtnAlfanumerico;
			}
			if (rtnNumerico && this.formularioControls.rtnNumerico.valid) {
				params.rtnNumerico = rtnNumerico;
			}

			this.propVehiculosService
				.getClasePlacasByRNTUsingGET(params)
				.subscribe((data) => {
					this.clasePlacas = data;
					if (data.length > 0) {
						this.formularioControls.clasePlaca.enable();
					} else {
						this.formularioControls.clasePlaca.disable();
					}
				});
			this.propVehiculosService
				.getAfectacionesByRNTUsingGET(params)
				.subscribe((data) => {
					this.afectaciones = data;
					if (data.length > 0) {
						this.formularioControls.afectacion.enable();
					} else {
						this.formularioControls.afectacion.disable();
					}
				});
		} else if (
			!this.formularioControls.rtnAlfanumerico.value &&
			!this.formularioControls.rtnNumerico.value
		) {
			this.afectaciones = [];
			this.clasePlacas = [];
			this.formularioControls.afectacion.disable();
			this.formularioControls.clasePlaca.disable();
		}
	}

	validarCampos(): boolean {
		if (
			!this.formularioControls.rtnAlfanumerico.value &&
			!this.formularioControls.rtnNumerico.value &&
			!this.formularioControls.placa.value &&
			!this.formularioControls.nroComprobante.value
		) {
			this.toastr.error(
				'Es obligatorio ingresar al menos uno de los siguientes campos: <ul> <li>RTN Numérico</li> <li>RTN Alfanumérico</li> <li>Placa </li> <li>No de comprobante</li> </ul>',
				'',
				{ enableHtml: true }
			);
			return false;
		}
		return true;
	}

	consultar(): void {
		if (this.formulario.valid && this.validarCampos()) {
			const filtro = {} as FiltroConsultaMatricula;
			this.showSpinner = true;
			if (this.formularioControls.rtnAlfanumerico.value) {
				filtro.rtnAlfanumerico = this.formularioControls.rtnAlfanumerico.value;
			}
			if (this.formularioControls.rtnNumerico.value) {
				filtro.rtnNumerico = this.formularioControls.rtnNumerico.value;
			}
			if (this.formularioControls.placa.value) {
				filtro.placa = this.formularioControls.placa.value;
			}
			if (this.formularioControls.nroComprobante.value) {
				filtro.nroComprobante = this.formularioControls.nroComprobante.value;
			}
			if (this.formularioControls.clasePlaca.value) {
				filtro.clasePlaca = this.formularioControls.clasePlaca.value;
			}
			if (this.formularioControls.afectacion.value) {
				filtro.afectacion = this.formularioControls.afectacion.value;
			}

			this.propVehiculosService.getEstadoCuentaUsingPOST(filtro).subscribe({
				next: (data) => {
					this.data = data;
					this.dataSource = new MatTableDataSource(data);
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
					if (data.length > 0) {
						this.class1 = 'col-md-0';
						this.class2 = 'col-md-3';
						this.class3 = 'col-md-9';
						this.storageService.setItem('filtroConsulta', filtro);
					} else {
						this.class1 = 'col-md-2';
						this.class2 = 'col-md-8';
						this.class3 = 'col-md-2';
						this.toastr.warning('No se encontraron resultados');
						this.storageService.deleteItem('filtroConsulta');
					}
				},
				error: (err) => {
					this.toastr.error(err);
					this.showSpinner = false;
					this.class1 = 'col-md-2';
					this.class2 = 'col-md-8';
					this.class3 = 'col-md-2';
					this.data = [];
					this.storageService.deleteItem('filtroConsulta');
				},
				complete: () => (this.showSpinner = false),
			});
		}
	}

	applyFilter(event: string): void {
		this.dataSource.filter = event;
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	consultarTasa(item: ConsultaMatriculaToTable): void {
		this.router.navigateByUrl(
			'/consultas/vehiculares/consulta-tasas/'
			+ item.iduVehiculo + '/' +item.periodo
		);
	}

	limpiar() : void {
		this.formulario.reset();
		this.storageService.deleteItem('filtroConsulta');
		this.data = [];
		this.class1 = 'col-md-2';
		this.class2 = 'col-md-8';
		this.class3 = 'col-md-2';
	}

}
