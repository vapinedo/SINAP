import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultaTasasComponent } from './pages/consulta-tasas/consulta-tasas.component';
import { DetNovedadesBancoComponent } from './pages/det-novedades-banco/det-novedades-banco.component';
import { DetNovedadesIpComponent } from './pages/det-novedades-ip/det-novedades-ip.component';


import { EstadoCuentaVehicularComponent } from './pages/estado-cuenta-vehicular/estado-cuenta-vehicular.component';
import { InfoMatriculaBancoComponent } from './pages/info-matricula-banco/info-matricula-banco.component';
import { InfoMatriculaIpComponent } from './pages/info-matricula-ip/info-matricula-ip.component';
import { TramitesVehiculosDetComponent } from './pages/tramites-vehiculo/tramites-vehiculos-det/tramites-vehiculos-det.component';
import { TramitesVehiculosComponent } from './pages/tramites-vehiculo/tramites-vehiculos/tramites-vehiculos.component';
import { VehiculosExentosComponent } from './pages/vehiculos-exentos/vehiculos-exentos.component';

const routes: Routes = [
  { path: 'estado-cuenta-vehicular', component: EstadoCuentaVehicularComponent, data: { breadcrumb: 'Estado cuenta vehicular'} },
	{ path: 'estado-cuenta-vehicular/:limpiar_form', component: EstadoCuentaVehicularComponent, data: { breadcrumb: 'Estado cuenta vehicular'} },
  { path: 'tramitesVehiculos', component: TramitesVehiculosComponent, data: { breadcrumb: 'Trámites en vehículos'} },
    { path: 'tramitesVehiculosDet', component: TramitesVehiculosDetComponent, data: { breadcrumb: 'Débitos registrales'} },
  { path: 'vehiculos-exentos', component: VehiculosExentosComponent, data: { breadcrumb: 'Vehiculos exentos'} } ,
		{ path: 'consulta-tasas/:idu_vehiculo/:periodo', component: ConsultaTasasComponent, data: { breadcrumb: 'Consulta de tasa'}} ,
		{ path: 'consulta-tasas/info-matricula-ip/:idu_vehiculo/:periodo', component: InfoMatriculaIpComponent, data: { breadcrumb: 'Matrículas'} },
		{ path: 'consulta-tasas/info-matricula-banco/:idu_vehiculo/:periodo', component: InfoMatriculaBancoComponent, data: { breadcrumb: 'Matrículas'} },
		{ path: 'consulta-tasas/det-novedades-banco/:idu_vehiculo/:periodo', component: DetNovedadesBancoComponent, data: { breadcrumb: 'Matrículas'} },
		{ path: 'consulta-tasas/det-novedades-ip/:idu_vehiculo/:periodo', component: DetNovedadesIpComponent, data: { breadcrumb: 'Matrículas'} }




];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class VehicularesRoutingModule { }
