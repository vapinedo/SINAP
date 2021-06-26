import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConceptosAdminComponent } from './pages/conceptos/admin/conceptos-admin.component';

import { CalendarioPagosComponent } from './pages/calendario/admin/calendario-pagos.component';
import { TasasAdminComponent } from './pages/tasas/tasas-admin.component';
import { TarifasAdminComponent } from './pages/tarifas/admin/tarifas-admin.component';

const routes: Routes = [
  { path: 'calendarios', component: CalendarioPagosComponent, data: { breadcrumb: 'Calendarios de pago'} },
  { path: 'conceptos', component: ConceptosAdminComponent, data: { breadcrumb: 'Conceptos'} } ,
  { path: 'tasas', component: TasasAdminComponent, data: { breadcrumb: 'Creación de tasas'} },
  { path: 'tarifas', component: TarifasAdminComponent, data: { breadcrumb: 'Tarifas por concepto de debido'} },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ValoresCobrosRoutingModule { }