import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarioComponent } from './pages/calendario/calendario.component';

import { MultasAdminComponent } from './pages/multas/admin/multas-admin.component';

import { NormativasAdminComponent } from './pages/normativas/normativas-admin.component';
import { ReglasSistemaAdminComponent } from './pages/reglas-sitema/reglas-sistema-admin.component';

const routes: Routes = [
  { path: 'multas', component: MultasAdminComponent, data: { breadcrumb: 'Multas'} },
  { path: 'normativas', component: NormativasAdminComponent, data: { breadcrumb: 'Normativas'} },
  { path: 'reglas-sistema', component: ReglasSistemaAdminComponent, data: { breadcrumb: 'Reglas del sistema'} },
  { path: 'calendario', component: CalendarioComponent, data: { breadcrumb: 'Calendario'} },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class MotorReglasRoutingModule { }