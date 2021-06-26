import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleEstadoCuenta } from '@core/api/models/detalle-estado-cuenta';
import { PropVehiculosService } from '@core/api/services';

@Component({
	selector: 'app-consulta-tasas',
	templateUrl: './consulta-tasas.component.html',
	styleUrls: ['./consulta-tasas.component.scss'],
})
export class ConsultaTasasComponent implements OnInit {

	iduVehiculo: string;
	periodo: string;

	detalle : DetalleEstadoCuenta;

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private propVehiculosService: PropVehiculosService
	) {}

	ngOnInit(): void {
		this.iduVehiculo = this.activatedRoute.snapshot.paramMap.get('idu_vehiculo');
		this.periodo = this.activatedRoute.snapshot.paramMap.get('periodo');
		this.getDetalle();
	}

	goBack(): void {
		//window.history.back();
		this.router.navigateByUrl('/consultas/vehiculares/estado-cuenta-vehicular');
	}

	getDetalle() : void {
		this.propVehiculosService.getDetalleVehiculoUsingGET(Number(this.iduVehiculo)).subscribe( {
			next : data => {
				this.detalle = data;
			},
			error: (err) => {
					console.log(err);
			},
			complete: () => {console.log('');}
		});
	}
}
