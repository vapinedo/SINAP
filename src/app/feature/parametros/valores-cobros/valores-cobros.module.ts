import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { ValoresCobrosRoutingModule } from './valores-cobros-routing.module';

// components
import { VentanaModalComponent } from './components/ventana-modal/ventana-modal.component';

// pages
import { CalendarioPagosComponent } from './pages/calendario/admin/calendario-pagos.component';
import { CalendarioPagosDetalleComponent } from './pages/calendario/detalle/calendario-pagos-detalle.component';
import { CalendarioPagosCrearComponent } from './pages/calendario/crear/calendario-pagos-crear.component';
import { CalendarioEditarComponent } from './pages/calendario/editar/calendario-editar.component';
import { CalendarioEliminarComponent } from './pages/calendario/eliminar/calendario-eliminar.component';

import { ConceptosAdminComponent } from './pages/conceptos/admin/conceptos-admin.component';
import { ConceptoCrearComponent } from './pages/conceptos/crear/concepto-crear.component';
import { ConceptoEditarComponent } from './pages/conceptos/editar/concepto-editar.component';
import { ConceptoDetalleComponent } from './pages/conceptos/detalle/concepto-detalle.component';
import { ConceptoEliminarComponent } from './pages/conceptos/eliminar/concepto-eliminar.component';

import { TasasAdminComponent } from './pages/tasas/tasas-admin.component';

import { TarifasAdminComponent } from './pages/tarifas/admin/tarifas-admin.component';
import { FiltroTablaComponent } from './components/filtro-tabla/filtro-tabla.component';
import { TarifaCrearComponent } from './pages/tarifas/crear/tarifa-crear.component';
import { AsociarMunicipiosComponent } from './pages/tarifas/municipios/asociar-municipios.component';
import { TarifaRegistralCrearComponent } from './pages/tarifas/registral-crear/tarifa-registral-crear.component';
import { TarifaRegistralEditarComponent } from './pages/tarifas/registral-editar/tarifa-registral-editar.component';
import { TarifasFiltrosComponent } from './components/tarifas/filtros/tarifas-filtros.component';
import { TarifaEditarComponent } from './pages/tarifas/editar/tarifa-editar.component';
import { TarifaEliminarComponent } from './pages/tarifas/eliminar/tarifa-eliminar.component';

const modules = [
  CommonModule,
  SharedModule,
  ValoresCobrosRoutingModule
];

const components = [
  VentanaModalComponent,
  // Tasas
  TasasAdminComponent,

  FiltroTablaComponent,
  VentanaModalComponent,
  // Calendario Pagos
  CalendarioPagosComponent,
  CalendarioPagosDetalleComponent,
  CalendarioPagosCrearComponent,   
  CalendarioEditarComponent,
  CalendarioEliminarComponent,
  // Conceptos
  ConceptosAdminComponent,
  ConceptoCrearComponent,
  ConceptoEditarComponent,
  ConceptoDetalleComponent,
  ConceptoEliminarComponent,
  // Tarifas
  TarifasAdminComponent,
  TarifaCrearComponent,
  TarifaEditarComponent,
  AsociarMunicipiosComponent,
  TarifaRegistralCrearComponent,
  TarifaRegistralEditarComponent,
  TarifasFiltrosComponent,
  TarifaEliminarComponent,
  // Tasas
  TasasAdminComponent
];

const entryComponents = [
  VentanaModalComponent
];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [modules],
  entryComponents:[entryComponents] 
})
export class ValoresCobrosModule { }
