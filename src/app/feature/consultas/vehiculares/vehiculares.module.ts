import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { VehicularesRoutingModule } from './vehiculares-routing.module';
import { EstadoCuentaVehicularComponent } from './pages/estado-cuenta-vehicular/estado-cuenta-vehicular.component';
import { TramitesVehiculosComponent } from './pages/tramites-vehiculo/tramites-vehiculos/tramites-vehiculos.component';
import { TramitesVehiculosDetComponent } from './pages/tramites-vehiculo/tramites-vehiculos-det/tramites-vehiculos-det.component';



import { VehiculosExentosComponent } from './pages/vehiculos-exentos/vehiculos-exentos.component';
import { VehiculosExentosDetalleComponent } from './pages/vehiculos-exentos/detalle/vehiculos-exentos-detalle.component';
import { ConsultaTasasComponent } from './pages/consulta-tasas/consulta-tasas.component';
import { SubMenuConsultasComponent } from './shared/sub-menu-consultas/sub-menu-consultas.component';
import { InfoMatriculaIpComponent } from './pages/info-matricula-ip/info-matricula-ip.component';
import { InfoMatriculaBancoComponent } from './pages/info-matricula-banco/info-matricula-banco.component';
import { DetNovedadesIpComponent } from './pages/det-novedades-ip/det-novedades-ip.component';
import { DetNovedadesBancoComponent } from './pages/det-novedades-banco/det-novedades-banco.component';
import { MaterialModule } from 'src/app/material.module';

const modules = [
  CommonModule,
  SharedModule,
  VehicularesRoutingModule
];

const components = [
  EstadoCuentaVehicularComponent,
  TramitesVehiculosComponent,
  TramitesVehiculosDetComponent,
  ConsultaTasasComponent,
  SubMenuConsultasComponent,
  InfoMatriculaIpComponent, 
  InfoMatriculaBancoComponent,
   DetNovedadesIpComponent, 
   DetNovedadesBancoComponent, 
   VehiculosExentosComponent, 
   VehiculosExentosDetalleComponent
];

@NgModule({
  declarations: [components, ],
  exports: [components],
  imports: [modules]
})
export class VehicularesModule { }
