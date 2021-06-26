import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { BancariasRoutingModule } from './bancarias-routing.module';
import { ConsultaCuentaCorrienteComponent } from './pages/consulta-cuenta-corriente/consulta-cuenta-corriente.component';
import { DetalleCuentaCorrienteComponent } from './pages/detalle-cuenta-corriente/detalle-cuenta-corriente.component';
import { DetalleTransaccionesComponent } from './pages/detalle-transacciones/detalle-transacciones.component';


const modules = [
  CommonModule,
  SharedModule,
  BancariasRoutingModule
];

const components = [

];

@NgModule({
  declarations: [components, ConsultaCuentaCorrienteComponent, DetalleCuentaCorrienteComponent, DetalleTransaccionesComponent],
  exports: [components],
  imports: [modules]
})
export class BancariasModule { }
