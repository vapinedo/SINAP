import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {
	menu: any[] = [
		{
			title: 'Gestión de parámetros',
			icon: 'toc',
			modules: [
				{
					title: 'Motor de Reglas',
					items: [
						{ title: 'Normativas', path: '/parametros/motor-reglas/normativas' },
						{
							title: 'Reglas de Sistema',
							path: '/parametros/motor-reglas/reglas-sistema',
						},
						{ title: 'Calendario', path: '/parametros/motor-reglas/calendario' },
						{ title: 'Multas', path: '/parametros/motor-reglas/multas' },
					],
				},
				{
					title: 'Valores de Cobros',
					items: [
						{ title: 'Débitos', path: '/parametros/valores-cobros/debitos' },
						{ title: 'Creación de Tasas', path: '/parametros/valores-cobros/tasas' },
						{
							title: 'Conceptos de débitos',
							path: '/parametros/valores-cobros/conceptos',
						},
						{
							title: 'Calendarios de pagos',
							path: '/parametros/valores-cobros/calendarios',
						},
					],
				},
				{
					title: 'Casos de Amnistía',
					items: [
						{ title: 'Exonerados', path: '/parametros/casos-amnistia/exonerados' },
						{
							title: 'Prescripciones',
							path: '/parametros/casos-amnistia/prescripciones',
						},
					],
				},
			],
		},
		{
			title: 'Consultas',
			icon: 'fact_check',
			modules: [
				{
					title: 'Vehiculares',
					items: [
						{
							title: 'Estado de cuenta vehicular',
							path: '/consultas/vehiculares/estado-cuenta-vehicular/true',
						},
						{ title: 'Inventarios de placas', path: '' },
						{ title: 'Mora por contribuyente', path: '' },
						{
							title: 'Trámites en vehículos',
							path: '/consultas/vehiculares/tramitesVehiculos',
						},
						{
							title: 'Débitos registrales',
							path: '/consultas/vehiculares/tramitesVehiculosDet',
					
						},
						{
							title: 'Vehículos exentos',
							path: '/consultas/vehiculares/vehiculos-exentos',
						},
					],
				},
				{
					title: 'Bancarias',
					items: [
						{ title: 'Créditos del banco', path: '' },
						{ title: 'Consulta cuentas corrientes', path: '/consultas/bancarias/consulta-cuenta-corriente' },
					],
				},
			],
		},
		{
			title: 'Recaudo',
			icon: 'paid',
			modules: [],
		},
		{
			title: 'Cobranza',
			icon: 'point_of_sale',
			modules: [],
		},
		{
			title: 'Reportes',
			icon: 'leaderboard',
			modules: [],
		},
		{
			title: 'Auditorías',
			icon: 'people_alt',
			modules: [],
		},
	];

	constructor() {}
}
