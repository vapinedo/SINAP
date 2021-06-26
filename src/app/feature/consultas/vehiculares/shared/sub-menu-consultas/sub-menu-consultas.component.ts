import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultaMatriculaToTable } from '@core/api/models/consulta-matricula-to-table';

@Component({
	selector: 'app-sub-menu-consultas',
	templateUrl: './sub-menu-consultas.component.html',
	styleUrls: ['./sub-menu-consultas.component.scss'],
})
export class SubMenuConsultasComponent implements OnInit {

	@Input() iduVehiculo: number;
	@Input() periodo: number;
	@Input() selected : string;

	constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {}

	onClick(opcion: string): void {
		switch (opcion) {
			case 'consulta-tasa':
				this.router.navigateByUrl(
					'/consultas/vehiculares/consulta-tasas/' + this.iduVehiculo + '/' +this.periodo
				);
				break;
			case 'matricula-ip':
				this.router.navigateByUrl(
					'/consultas/vehiculares/consulta-tasas/info-matricula-ip/'
					+ this.iduVehiculo + '/' +this.periodo
				);
				break;
			case 'matricula-banco':
				this.router.navigateByUrl(
					'/consultas/vehiculares/consulta-tasas/info-matricula-banco/'
					+ this.iduVehiculo + '/' +this.periodo
				);
				break;
			case 'novedades-ip':
				this.router.navigateByUrl(
					'/consultas/vehiculares/consulta-tasas/det-novedades-ip/'
					+ this.iduVehiculo + '/' +this.periodo
				);
				break;
			case 'novedades-banco':
				this.router.navigateByUrl(
					'/consultas/vehiculares/consulta-tasas/det-novedades-banco/'
					+ this.iduVehiculo + '/' +this.periodo
				);

				break;

			default:
				break;
		}
	}
}
