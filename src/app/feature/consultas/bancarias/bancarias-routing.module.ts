import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultaCuentaCorrienteComponent } from './pages/consulta-cuenta-corriente/consulta-cuenta-corriente.component';
import { DetalleCuentaCorrienteComponent } from './pages/detalle-cuenta-corriente/detalle-cuenta-corriente.component';
import { DetalleTransaccionesComponent } from './pages/detalle-transacciones/detalle-transacciones.component';


const routes: Routes = [
  { path: 'consulta-cuenta-corriente', component: ConsultaCuentaCorrienteComponent, data: { breadcrumb: 'Consulta cuenta corriente'} },
	{ path: 'consulta-cuenta-corriente/:limpiar_form', component: ConsultaCuentaCorrienteComponent, data: { breadcrumb: 'Consulta cuenta corriente'} },
	{ path: 'detalle-cuenta-corriente/:iduVehiculo/:tipoTasa/:idTasa', component: DetalleCuentaCorrienteComponent, data: { breadcrumb: 'Consulta cuenta corriente'} },
	{ path: 'detalle-transacciones', component: DetalleTransaccionesComponent, data: { breadcrumb: 'Consulta cuenta corriente'} },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class BancariasRoutingModule { }
