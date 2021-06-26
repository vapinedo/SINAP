import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExoneradosAdminComponent } from './pages/exonerados/exonerados-admin.component';
import { PrescripcionesAdminComponent } from './pages/prescripciones/prescripciones-admin.component';

const routes: Routes = [
  { path: 'exonerados', component: ExoneradosAdminComponent, data: { breadcrumb: 'Exonerados'} },
  { path: 'prescripciones', component: PrescripcionesAdminComponent, data: { breadcrumb: 'Prescripciones'} }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class CasosAmnistiaRoutingModule { }