import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParametrosComponent } from '@feature/parametros/parametros.component';
import { ConsultasComponent } from '@feature/consultas/consultas.component';

const Routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@feature/auth/auth.module')
    .then(m => m.AuthModule)
  },
  {
    path: 'parametros',
    component: ParametrosComponent,
    data: { breadcrumb: 'Parámetros' },
    children: [
      {
        path: 'motor-reglas',
        data: { breadcrumb: 'Motor de Reglas' },
        loadChildren: () => import('@feature/parametros/motor-reglas/motor-reglas.module')
        .then(m => m.MotorReglasModule)
      },
      {
        path: 'valores-cobros',
        data: { breadcrumb: 'Valores de cobros' },
        loadChildren: () => import('@feature/parametros/valores-cobros/valores-cobros.module')
        .then(m => m.ValoresCobrosModule)
      },
      {
        path: 'casos-amnistia',
        data: { breadcrumb: 'Casos de amnistía' },
        loadChildren: () => import('@feature/parametros/casos-amnistia/casos-amnistia.module')
        .then(m => m.CasosAmnistiaModule)
      }
    ]
  },
		{
			path: 'consultas',
			component: ParametrosComponent,
			data: { breadcrumb: 'Consultas' },
			children: [
					{
							path: 'vehiculares',
							data: { breadcrumb: 'Vehiculares' },
							loadChildren: () => import('@feature/consultas/vehiculares/vehiculares.module')
							.then(m => m.VehicularesModule)
					},
					{
						path: 'bancarias',
						data: { breadcrumb: 'Bancarias' },
						loadChildren: () => import('@feature/consultas/bancarias/bancarias.module')
						.then(m => m.BancariasModule)
				}
			]

	},
  { path: '', redirectTo: '/parametros', pathMatch: 'full' },
  { path: '**', redirectTo: '/parametros' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(Routes, {useHash: true}),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
