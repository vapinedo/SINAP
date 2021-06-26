import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-info-matricula-banco',
	templateUrl: './info-matricula-banco.component.html',
	styleUrls: ['./info-matricula-banco.component.scss'],
})
export class InfoMatriculaBancoComponent implements OnInit {
	iduVehiculo: string;
	periodo: string;
	constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

	ngOnInit(): void {
		this.iduVehiculo = this.activatedRoute.snapshot.paramMap.get('idu_vehiculo');
		this.periodo = this.activatedRoute.snapshot.paramMap.get('periodo');
	}

	goBack(): void {
		this.router.navigateByUrl('/consultas/vehiculares/estado-cuenta-vehicular');
	}
}
